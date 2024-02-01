<template>
  <div class="knight-form" v-if="!isConfirming">
    <div class="close-form-button-container">
      <button @click="onsubmit" aria-label="Fechar cadastro">
        <font-awesome-icon icon="fa-solid fa-close" size="2x" />
      </button>
    </div>
    <h1>Cadastrar cavalheiro</h1>
    <h2>Informações gerais</h2>
    <div class="knight-form-row">
      <div class="knight-form-field">
        <label for="input-knight-name">Nome</label>
        <input
          data-testid="input-knight-name"
          id="input-knight-name"
          :disabled="isEditing"
          v-model="knight.name"
        />
        <p v-if="fieldErrors.includes('name')" class="knight-form-field-error">
          Campo inválido
        </p>
      </div>

      <div class="knight-form-field">
        <label for="input-knight-nickname">Apelido</label>
        <input
          :disabled="isDeleted"
          data-testid="input-knight-nickname"
          id="input-knight-nickname"
          v-model="knight.nickname"
        />
        <p
          v-if="fieldErrors.includes('nickname')"
          class="knight-form-field-error"
        >
          Campo inválido
        </p>
      </div>

      <div class="knight-form-field">
        <label for="input-knight-birthday">Data de nascimento</label>
        <input
          data-testid="input-knight-birthday"
          id="input-knight-birthday"
          :disabled="isEditing"
          v-model="knight.birthday"
          v-maska
          data-maska="##/##/####"
        />
        <p
          v-if="fieldErrors.includes('birthday')"
          class="knight-form-field-error"
        >
          Campo inválido
        </p>
      </div>
    </div>

    <h2>Atributos</h2>
    <div class="knight-form-row">
      <div class="knight-form-field">
        <label for="input-knight-strength">Força</label>
        <input
          data-testid="input-knight-strength"
          id="input-knight-strength"
          :disabled="isEditing"
          type="number"
          v-model="knight.attributes.strength"
        />
        <p
          v-if="fieldErrors.includes('strength')"
          class="knight-form-field-error"
        >
          Campo inválido
        </p>
      </div>
      <div class="knight-form-field">
        <label for="input-knight-dexterity">Destreza</label>
        <input
          data-testid="input-knight-dexterity"
          id="input-knight-dexterity"
          :disabled="isEditing"
          type="number"
          v-model="knight.attributes.dexterity"
        />
        <p
          v-if="fieldErrors.includes('dexterity')"
          class="knight-form-field-error"
        >
          Campo inválido
        </p>
      </div>
      <div class="knight-form-field">
        <label for="input-knight-constitution">Constituição</label>
        <input
          data-testid="input-knight-constitution"
          id="input-knight-constitution"
          :disabled="isEditing"
          type="number"
          v-model="knight.attributes.constitution"
        />
        <p
          v-if="fieldErrors.includes('constitution')"
          class="knight-form-field-error"
        >
          Campo inválido
        </p>
      </div>
    </div>

    <div class="knight-form-row">
      <div class="knight-form-field">
        <label for="input-knight-intelligence">Inteligencia</label>
        <input
          data-testid="input-knight-intelligence"
          id="input-knight-intelligence"
          :disabled="isEditing"
          type="number"
          v-model="knight.attributes.intelligence"
        />
        <p
          v-if="fieldErrors.includes('intelligence')"
          class="knight-form-field-error"
        >
          Campo inválido
        </p>
      </div>

      <div class="knight-form-field">
        <label for="input-knight-wisdom">Sabedoria</label>
        <input
          data-testid="input-knight-wisdom"
          id="input-knight-wisdom"
          :disabled="isEditing"
          type="number"
          v-model="knight.attributes.wisdom"
        />
        <p
          v-if="fieldErrors.includes('wisdom')"
          class="knight-form-field-error"
        >
          Campo inválido
        </p>
      </div>

      <div class="knight-form-field">
        <label for="input-knight-charisma">Carisma</label>
        <input
          data-testid="input-knight-charisma"
          id="input-knight-charisma"
          :disabled="isEditing"
          type="number"
          v-model="knight.attributes.charisma"
        />
        <p
          v-if="fieldErrors.includes('charisma')"
          class="knight-form-field-error"
        >
          Campo inválido
        </p>
      </div>
    </div>

    <div class="knight-form-row">
      <div class="knight-form-field">
        <label for="input-knight-keyAttribute">Attributo principal</label>
        <select
          data-testid="input-knight-keyAttribute"
          id="input-knight-keyAttribute"
          :disabled="isEditing"
          v-model="knight.keyAttribute"
        >
          <option
            v-for="item in keyAttributeOptions"
            :value="item.value"
            v-bind:key="item.value"
          >
            {{ item.label }}
          </option>
        </select>
        <p
          v-if="fieldErrors.includes('keyAttribute')"
          class="knight-form-field-error"
        >
          Campo inválido
        </p>
      </div>
    </div>

    <div class="weapons-form-container">
      <h2>Armas</h2>
      <div v-for="weapon in knight.weapons" v-bind:key="weapon.id">
        <div class="knight-form-row">
          <div class="knight-form-field">
            <label for="input-knight-weapon-name">Nome da arma</label>
            <input
              data-testid="input-knight-weapon-name"
              id="input-knight-weapon-name"
              :disabled="isEditing"
              v-model="weapon.name"
            />
          </div>

          <div class="knight-form-field">
            <label for="input-knight-weapon-attribute">Atributo</label>
            <input
              data-testid="input-knight-weapon-attribute"
              id="input-knight-weapon-attribute"
              :disabled="isEditing"
              v-model="weapon.attr"
            />
          </div>

          <div class="knight-form-field">
            <label for="input-knight-weapon-mod">Mod</label>
            <input
              data-testid="input-knight-weapon-mod"
              id="input-knight-weapon-mod"
              :disabled="isEditing"
              type="number"
              v-model="weapon.mod"
            />
          </div>

          <div class="knight-form-field checkbox">
            <label for="input-knight-weapon-equipped">Equipado</label>
            <input
              data-testid="input-knight-weapon-equipped"
              id="input-knight-weapon-equipped"
              :disabled="isEditing"
              type="checkbox"
              v-model="weapon.equipped"
              @change="onChangeEquippedWeapon(weapon.id || 0)"
            />
          </div>
        </div>

        <p
          data-testid="input-knight-weapon-error"
          id="input-knight-weapon-error"
          class="knight-form-field-error"
          v-if="fieldErrors.includes('weapons')"
        >
          Há dados inconsistentes das armas, confira e tente novamente
        </p>
      </div>

      <button
        data-testid="knight-form-add-weapon-button"
        :disabled="isEditing"
        class="add-weapon-button"
        @click="addEmptyWeapon()"
      >
        +
      </button>
    </div>

    <div v-if="!isDeleted" class="knight-form-submit-button-container">
      <button data-testid="knight-form-submit-button" @click="submitKnight()">
        {{ isEditing ? "Salvar" : "Cadastrar" }}
      </button>
    </div>

    <div class="become-hero-button" v-if="isEditing && !isDeleted">
      <button data-testid="knight-form-delete-button" @click="removeKnight()">
        Tornar Heroi (Remover)
      </button>
    </div>
  </div>

  <RemoveKnightConfirmation
    v-if="isConfirming"
    :answerConfirmation="confirmRemoveKnight"
  />
</template>

<script lang="ts">
import { IKnight } from "@/models/knight";
import { Options, Vue, prop } from "vue-class-component";
import { vMaska } from "maska";
import moment from "moment";
import knightService from "@/services/knight-service";
import { container, openModal } from "jenesius-vue-modal";
import RemoveKnightConfirmation from "../RemoveKnightConfirmation/RemoveKnightConfirmation.vue";

class Props {
  onsubmit = prop<() => void>({ required: true });
  knightId = prop<string>({ required: false });
  isDeleted = prop<boolean>({ required: false });
}

@Options({
  directives: { maska: vMaska },
  components: {
    WidgetContainerModal: container,
    RemoveKnightConfirmation,
  },
})
export default class KnightForm extends Vue.with(Props) {
  isLoading = false;
  isEditing = false;
  isConfirming = false;

  knight: IKnight = {
    name: "",
    nickname: "",
    birthday: "",
    weapons: [],
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    keyAttribute: "" as any,
  };
  fieldErrors: string[] = [];
  keyAttributeOptions = [
    {
      label: "Força",
      value: "strength",
    },
    {
      label: "Destreza",
      value: "dexterity",
    },
    {
      label: "Constituição",
      value: "constitution",
    },
    {
      label: "Inteligencia",
      value: "intelligence",
    },
    {
      label: "Sabedoria",
      value: "wisdom",
    },
    {
      label: "Carisma",
      value: "charisma",
    },
  ];

  mounted(): void {
    this.getKnight();
  }

  async getKnight() {
    try {
      if (!this.knightId) {
        this.addEmptyWeapon();
        return;
      }

      this.isEditing = true;
      this.isLoading = true;
      this.knight = await knightService.getById(this.knightId);
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  async removeKnight() {
    this.isConfirming = true;
  }

  async confirmRemoveKnight(answer: boolean) {
    if (answer && this.knight._id) {
      await knightService.delete(this.knight._id);
      this.onsubmit();
    } else {
      this.isConfirming = false;
    }
  }

  onChangeEquippedWeapon(weaponId: number) {
    const weaponsToUnequip = this.knight.weapons.filter(
      (a) => a.id !== weaponId
    );

    const weaponToEquipeIndex = this.knight.weapons.findIndex(
      (a) => a.id === weaponId
    );

    this.knight.weapons[weaponToEquipeIndex].equipped = true;

    weaponsToUnequip.forEach((uneqWeapon) => {
      uneqWeapon.equipped = false;
    });
  }

  async submitKnight() {
    const formattedKnightData = {
      ...this.knight,
      birthday: moment(this.knight.birthday, "DD/MM/YYYY").format("YYYY-MM-DD"),
    };

    try {
      if (this.knightId) {
        await knightService.updateNickname(
          this.knightId,
          formattedKnightData.nickname
        );
      } else {
        await knightService.add(formattedKnightData);
      }
      this.onsubmit();
    } catch (err: any) {
      console.log("erro ao cadastrar cavalheiro", err);
      this.fieldErrors = err.fieldErrors || [];
    }
  }

  addEmptyWeapon() {
    this.knight.weapons.push({
      id: Math.floor(1 + (100 - 1) * Math.random()),
      attr: "",
      equipped: false,
      mod: 0,
      name: "",
    });
  }
}
</script>

<style src="./KnightForm.css" />
