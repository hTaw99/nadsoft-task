import { useActionsContext } from "src/contexts/actionsContext";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useAxiosRequest<resType>(
  reqUrl: string,
  reqBody?: any,
  dependenciesArr: any[] = [],
  preventRequest: boolean = false,
  { showLoading, headers = {} }: any = {}
): [resType | null, boolean, any, (p?: any) => Promise<void>] {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const { setAction, setActionData } = useActionsContext();
  useEffect(() => {
    if (preventRequest) return;

    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependenciesArr);
  const sendRequest = useCallback(async (extraData: any = {}) => {
    //to adjust if passed event object to it
    if (extraData.target) {
      extraData = {};
    }
    try {
      if (showLoading) setAction("loading");

      setloading(true);
      setError(null);
      let res;
      if (reqBody) {
        res = await axios.post(reqUrl, { ...reqBody, ...extraData }, { headers });
      } else {
        res = await axios.get(reqUrl, headers);
      }
      const data = res.data;
      setData(data);

      setloading(false);

      if (showLoading) setAction("");
      if (data.action) {
        setAction(data.actionType);
        setActionData(data.actionData);
      }
    } catch (e: any) {
      const data = e.response.data;
      setError(data);
      setloading(false);
      if (showLoading) setAction("");
      if (data.action) {
        setAction(data.actionType);
        setActionData(data.actionData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependenciesArr);
  return [data, loading, error, sendRequest];
}
