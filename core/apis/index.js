import { get_query_string } from "../../utils";
const { API_URL } = process.env;

export default {
  auth: {
    async login(_data) {
      return await request(
        `${API_URL}/sign-in`,
        { method: "post", data: JSON.stringify(_data) }
      );
    },
    async signup({ accessType, ..._data }) {
      return await request(
        `${API_URL}/register/${accessType.toLowerCase()}s`,
        { method: "post", data: JSON.stringify({ ..._data, accessType }) }
      );
    },
  },
  bookings: {
    async get(opts) {
      return await request(
        `${API_URL}/bookings`,
        {
          query: {
            ...opts,
            limit: 20,
            offset: 1,
            city: opts.city || "lagos",
          },
        }
      );
    },
    async create(data) {
      return await request(
        `${API_URL}/bookings`,
        { method: "post", data: JSON.stringify(data) }
      );
    },
  },
  sessions: {
    async get(merchant) {
      try {
        if (!merchant) {
          throw new Error("Invalid merchant id");
        }
        return await request(
          `${API_URL}/studios/${merchant}`
        );
      } catch (error) {
        throw error;
      }
    },
    async create(merchant, data) {
      return request(
        `${API_URL}/studios/${merchant}`,
        { method: "post", data: JSON.stringify(data) }
      );
    },
  },
  users: {
    async get_users() {
      return await request(
        `${API_URL}/clients?type=USER&limit=20&offset=1`
      );
    },
    async get_merchants(opts = {}) {
      return await request(
        `${API_URL}/clients`,
        {
          query: {
            ...opts,
            type: "MERCHANT",
            limit: 20,
            offset: 1,
          },
        }
      );
    },
  },
};

export async function request(
  _path,
  { method = "get", data = {}, query = {}, variables = {} } = {}
) {
  let path = _path;
  const regex = /[$]\w+[^//]/g;
  let test;

  while (!!(test = regex.exec(_path))) {
    const [_string] = test;
    const string = _string.substring(1);
    const value = variables[string];

    path = path.replace(_string, value);
  }

  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json"
      },
    };

    if (method.toLowerCase() !== "get") options.body = data;
    const res = await fetch(`${path}?${get_query_string(query)}`, options);

    const _data = await res.json();
    if (_data.errors) throw new Error(_data.errors);

    return _data;
  } catch (error) {
    throw error;
  }
}
