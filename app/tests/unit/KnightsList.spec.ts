import { mount } from "@vue/test-utils";
import KnightsList from "../../src/components/KnightsList/KnightsList.vue";
import KnightForm from "../../src/components/KnightForm/KnightForm.vue";
import { IKnightStats } from "@/models/knight";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const knightStatsMock: IKnightStats = {
  _id: "d3adde9f-a6f5-4413-b62d-c0b72eb41a93",
  name: "Mauricio Gregorio",
  keyAttribute: "strength",
  weapons_quantity: 1,
  age: 25,
  attack: 13,
  exp: 1591,
};

const knightMock = {
  attributes: {
    strength: 5,
    dexterity: 5,
    constitution: 5,
    intelligence: 5,
    wisdom: 5,
    charisma: 5,
  },
  _id: "d3adde9f-a6f5-4413-b62d-c0b72eb41a93",
  name: "Mauricio Gregorio",
  nickname: "Mau",
  birthday: "1998-08-03",
  weapons: [
    {
      name: "Arco",
      mod: 5,
      attr: "Fogo",
      equipped: true,
      _id: "65b9627a8e96d8076acfcf0f",
    },
  ],
  keyAttribute: "strength",
  deleted: true,
  created_at: "2024-01-30T20:56:26.048Z",
  updated_at: "2024-01-30T20:56:26.048Z",
  __v: 0,
  deleted_at: "2024-01-30T20:57:22.891Z",
};

describe("KnightsList", () => {
  it("load Knights", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/knights").reply(200, [knightStatsMock]);
    // mock
    //   .onGet(`http://localhost:3000/knights/${knightStatsMock._id}`)
    //   .reply(200, knightStatsMock);

    const wrapper = mount(KnightsList, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
    });

    expect(wrapper.vm.knights.length).toBe(0);
    await wrapper.vm.getKnights();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.knights.length).toBe(1);

    mock.restore();
  });

  it("load heroes", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/knights").reply(200, [knightStatsMock]);
    mock
      .onGet("http://localhost:3000/knights?filter=heroes")
      .reply(200, [knightStatsMock]);

    const wrapper = mount(KnightsList, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
    });

    wrapper.vm.listType = "heroes";
    await wrapper.vm.getKnights();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.knights.length).toBe(1);

    mock.restore();
  });
});
