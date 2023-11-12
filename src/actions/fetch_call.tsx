export default (
    path: string,
    method: string,
    payload: any,
  )  => {
    const fetchOptions: any  = {
      method, 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
    };
    if (!Object.is(payload, null)) {
      fetchOptions.body = JSON.stringify(payload);
    }
    return fetch(`${path}`, fetchOptions)
      .then((response: any ) => {
        const json = response.json();
        return json;
      })
      .catch((err: any) => {
        throw err;
      });
  };
  