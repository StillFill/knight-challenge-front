<template>
  <div class="knight-list-container">
    <div class="new-knight-list-button">
      <button data-testid="knight-list-new-knight-button" @click="openForm()">
        Cadastrar cavalheiro
      </button>
    </div>

    <div class="list-toggle-buttons">
      <button
        data-testid="knight-list-select-knights-button"
        @click="selectListType('knights')"
        :class="listType === 'knights' ? 'selected' : ''"
      >
        Cavalheiros
      </button>
      <button
        data-testid="knight-list-select-heroes-button"
        @click="selectListType('heroes')"
        :class="listType === 'heroes' ? 'selected' : ''"
      >
        Heróis
      </button>
    </div>

    <div v-if="!isLoading">
      <table-lite
        :columns="table.columns"
        :rows="knights"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        @is-finished="table.isLoading = false"
        @row-clicked="onSelectKnight"
      />
    </div>

    <div
      class="loading-container"
      v-if="isLoading"
      data-testid="knight-list-loading"
    >
      <font-awesome-icon icon="fa-solid fa-spinner" spin size="6x" />
      <h1>Carregando cavalheiros</h1>
    </div>
  </div>

  <widget-container-modal />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import KnightService from "../../services/knight-service";
import { IKnight, IKnightStats } from "../../models/knight";
import { reactive } from "vue";
import { container, openModal } from "jenesius-vue-modal";
import KnightForm from "../KnightForm/KnightForm.vue";
import TableLite from "vue3-table-lite/ts";

@Options({
  components: {
    TableLite,
    WidgetContainerModal: container,
    KnightForm,
  },
})
export default class KnightsList extends Vue {
  knights: IKnight[] = [];
  isLoading = true;
  loadingErrorMessage = "";

  listType: IListType = "knights";

  async mounted(): Promise<void> {
    this.getKnights();
  }

  onSelectKnight(knight: IKnight) {
    this.openForm(knight._id);
  }

  selectListType(listType: IListType) {
    this.listType = listType;

    this.getKnights();
  }

  async getKnights() {
    try {
      this.isLoading = true;

      if (this.listType === "knights") {
        this.knights = await KnightService.getAllKnights();
      } else {
        this.knights = await KnightService.getAllHeroes();
      }

      this.table.totalRecordCount = this.knights.length;
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  async openForm(knightId?: string) {
    const modal = await openModal(KnightForm, {
      onsubmit: function () {
        modal.close();
      },
      knightId,
      isDeleted: this.listType === "heroes",
    });
    const getKnightsMid = this.getKnights;

    modal.onclose = function () {
      getKnightsMid();
    };
  }

  table = reactive({
    isLoading: false,
    columns: [
      {
        label: "Nome",
        field: "name",
        width: "20%",
        sortable: true,
      },
      {
        label: "Idade",
        field: "age",
        width: "20%",
        sortable: true,
      },
      {
        label: "Armas",
        field: "weapons_quantity",
        width: "20%",
        sortable: true,
      },
      {
        label: "Attribute",
        field: "keyAttribute",
        width: "20%",
        sortable: true,
      },
      {
        label: "Ataque",
        field: "attack",
        width: "20%",
        sortable: true,
      },
      {
        label: "Exp",
        field: "exp",
        width: "20%",
        sortable: true,
      },
    ],
    rows: [],
    totalRecordCount: 0,
    sortable: {
      order: "name",
      sort: "asc",
    },
  });
}

type IListType = "knights" | "heroes";
</script>

<style src="./KnightsList.css" />
