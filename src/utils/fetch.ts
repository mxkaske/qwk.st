const get = async (url: string, token?: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
  });
  return res.json();
};

const create = async <T extends Record<string, unknown>>(
  url: string,
  body: T
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  return res.json();
};

const update = async <T extends Record<string, unknown>>(
  url: string,
  body: Partial<T>
) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  return res.json();
};

const _delete = async (url: string) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
  });
  return res.json();
};

export { create, update, _delete, get };
