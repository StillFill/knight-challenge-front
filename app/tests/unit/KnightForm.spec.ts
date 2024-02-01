import { mount } from "@vue/test-utils";
import KnightForm from "../../src/components/KnightForm/KnightForm.vue";
import { IKnight, IKnightStats } from "@/models/knight";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const knightMock: IKnight = {
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
    },
  ],
  keyAttribute: "strength",
};

describe("KnightForm", () => {
  it("load empty form to create knight", async () => {
    const mock = new MockAdapter(axios);

    const wrapper = mount(KnightForm, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
      props: {
        onsubmit: jest.fn(),
        knightId: undefined,
        isDeleted: false,
      },
    });

    expect(wrapper.vm.knight).toEqual({
      name: "",
      nickname: "",
      birthday: "",
      weapons: [
        {
          id: wrapper.vm.knight.weapons[0].id,
          attr: "",
          equipped: false,
          mod: 0,
          name: "",
        },
      ],
      attributes: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
      keyAttribute: "" as any,
    });

    mock.restore();
  });

  it("load knight to edit", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(`http://localhost:3000/knights/${knightMock._id}`)
      .reply(200, knightMock);

    const wrapper = mount(KnightForm, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
      props: {
        onsubmit: jest.fn(),
        knightId: knightMock._id,
        isDeleted: false,
      },
    });

    await wrapper.vm.getKnight();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.knight).toEqual(knightMock);

    mock.restore();
  });

  it("show confirmation", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(`http://localhost:3000/knights/${knightMock._id}`)
      .reply(200, knightMock);

    const wrapper = mount(KnightForm, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
      props: {
        onsubmit: jest.fn(),
        knightId: knightMock._id,
        isDeleted: false,
      },
    });

    await wrapper.vm.getKnight();

    await wrapper.vm.$nextTick();

    await wrapper.vm.removeKnight();

    expect(wrapper.vm.isConfirming).toBeTruthy();

    mock.restore();
  });

  it("removeKnight - accept confirmation", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(`http://localhost:3000/knights/${knightMock._id}`)
      .reply(200, knightMock);

    mock.onDelete(`http://localhost:3000/knights/${knightMock._id}`).reply(200);

    const submitFn = jest.fn();

    const wrapper = mount(KnightForm, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
      props: {
        onsubmit: submitFn,
        knightId: knightMock._id,
        isDeleted: false,
      },
    });

    await wrapper.vm.getKnight();
    await wrapper.vm.$nextTick();
    await wrapper.vm.removeKnight();

    await wrapper.vm.confirmRemoveKnight(true);

    expect(submitFn).toBeCalled();

    mock.restore();
  });

  it("removeKnight - refuse confirmation", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(`http://localhost:3000/knights/${knightMock._id}`)
      .reply(200, knightMock);

    mock.onDelete(`http://localhost:3000/knights/${knightMock._id}`).reply(200);

    const submitFn = jest.fn();

    const wrapper = mount(KnightForm, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
      props: {
        onsubmit: submitFn,
        knightId: knightMock._id,
        isDeleted: false,
      },
    });

    await wrapper.vm.getKnight();
    await wrapper.vm.$nextTick();
    await wrapper.vm.removeKnight();

    await wrapper.vm.confirmRemoveKnight(false);

    expect(submitFn).toBeCalledTimes(0);
    expect(wrapper.vm.isConfirming).toBeFalsy();

    mock.restore();
  });

  it("check checkbox toggle", async () => {
    const submitFn = jest.fn();

    const wrapper = mount(KnightForm, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
      props: {
        onsubmit: submitFn,
        knightId: undefined,
        isDeleted: false,
      },
    });

    await wrapper.vm.addEmptyWeapon();
    await wrapper.vm.addEmptyWeapon();
    await wrapper.vm.addEmptyWeapon();
    await wrapper.vm.addEmptyWeapon();
    await wrapper.vm.$nextTick();

    const knightWeapons = wrapper.vm.knight.weapons;

    await wrapper.vm.onChangeEquippedWeapon(knightWeapons[2].id || 0);
    await wrapper.vm.$nextTick();

    const knightWeapons2 = wrapper.vm.knight.weapons;
    expect(knightWeapons2[2].equipped).toBeTruthy();

    await wrapper.vm.onChangeEquippedWeapon(knightWeapons[0].id || 0);
    await wrapper.vm.$nextTick();

    const knightWeapons3 = wrapper.vm.knight.weapons;
    expect(knightWeapons3[0].equipped).toBeTruthy();
    expect(knightWeapons3[2].equipped).toBeFalsy();
  });

  it("submit new knight", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`http://localhost:3000/knights`).reply(201);

    const submitFn = jest.fn();

    const wrapper = mount(KnightForm, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
      props: {
        onsubmit: submitFn,
        knightId: undefined,
        isDeleted: false,
      },
    });

    const { _id, ...knightMockWithoutId } = knightMock;
    wrapper.vm.knight = knightMockWithoutId;

    await wrapper.vm.submitKnight();

    expect(submitFn).toBeCalled();

    mock.restore();
  });

  it("update knight nickname", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onPut(`http://localhost:3000/knights/nickname/${knightMock._id}`)
      .reply(200);
    mock
      .onGet(`http://localhost:3000/knights/${knightMock._id}`)
      .reply(200, knightMock);

    const submitFn = jest.fn();

    const wrapper = mount(KnightForm, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
      props: {
        onsubmit: submitFn,
        knightId: knightMock._id,
        isDeleted: false,
      },
    });

    wrapper.vm.knight.nickname = "newNickname";

    await wrapper.vm.submitKnight();

    expect(submitFn).toBeCalled();

    mock.restore();
  });
});
