import environmentDev from "../environments/environment.dev";
import { IKnight, IKnightStats } from "../models/knight";
import axios, { AxiosResponse } from "axios";

class KnightService {
  async getAllKnights(): Promise<IKnight[]> {
    const result = handleResponse<IKnight[]>(
      await axios.get<IKnight[]>(`${environmentDev.knight_api}`)
    );

    if (!result) throw new Error("Não foi possivel localizar os Cavalheiros");

    return result;
  }

  async getAllHeroes(): Promise<IKnight[]> {
    const result = handleResponse<IKnight[]>(
      await axios.get<IKnight[]>(`${environmentDev.knight_api}?filter=heroes`)
    );

    if (!result) throw new Error("Não foi possivel localizar os Cavalheiros");

    return result;
  }

  async getById(id: string): Promise<IKnight> {
    const result = handleResponse<IKnight>(
      await axios.get<IKnight>(`${environmentDev.knight_api}/${id}`)
    );

    if (!result) throw new Error("Não foi possivel localizar o cavalheiro");

    return result;
  }

  async add(newKnight: IKnight): Promise<void> {
    try {
      await axios.post<IKnight>(`${environmentDev.knight_api}`, newKnight);
    } catch (err: any) {
      throw {
        fieldErrors: [
          ...new Set(err.response.data.errors.map((a: any) => a.path)),
        ],
      };
    }
  }

  async updateNickname(id: string, nickname: string): Promise<void> {
    try {
      await axios.put<IKnight>(`${environmentDev.knight_api}/nickname/${id}`, {
        nickname,
      });
    } catch (err) {
      throw new Error("Não foi possivel atualizar o apelido do cavalheiro");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete<IKnight>(`${environmentDev.knight_api}/${id}`);
    } catch (err) {
      throw new Error("Não foi possivel remover o cavalheiro");
    }
  }
}

export default new KnightService();

const handleResponse = <T>(response: AxiosResponse<T>) => {
  if ([200, 201].includes(response.status)) {
    return response.data;
  } else if (response.status === 404) {
    return null;
  }

  throw new Error("Não foi possivel executar essa função");
};
