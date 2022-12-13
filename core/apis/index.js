export default {
  bookings: {
    async get() {
      const res = await fetch("https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856/bookings?limit=20&offset=1&city=lagos");
      const data = res.json();
      return data;
    }
  },
  sessions: {
    async get() {
      // update...
      const res = await fetch("https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856/studios/2c4a230c-5085-4924-a3e1-25fb4fc5965b");
      const data = res.json();
      return data;
    },
    async create() {
      const res = fetch("")
    }
  },
  users: {
    async get_users() {
      const res = await fetch("https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856/clients?type=USER&limit=20&offset=1");
      const data = res.json();
      return data;
    },
    async get_merchants() {
      const res = await fetch("https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856/clients?type=MERCHANT&limit=20&offset=1");
      const data = res.json();
      return data;
    }
  }
}