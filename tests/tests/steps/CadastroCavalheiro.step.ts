import {
  Given,
  BeforeAll,
  Before,
  Then,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import playwright, {
  Browser,
  chromium,
  Page,
  BrowserContext,
  expect,
} from "@playwright/test";

let browser: Browser;
let page: Page;
let context: BrowserContext;

setDefaultTimeout(50000);

BeforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
    slowMo: 500, // para visualizar melhor
  });
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

Given("Usuário está na tela de listagem de cavalheiros", async () => {
  await page.goto("http://localhost:8080");
});

Given("Ao entrar no formulario para criar um novo cavalheiro", () => {
  const newKnightButton = page.getByTestId("knight-list-new-knight-button");
  newKnightButton.click();
});

Given(
  "Preenche os dados do cavalheiro com {string}, {string}, {string}",
  async (nome: string, apelido: string, dataNascimento: string) => {
    await page.getByTestId("input-knight-name").fill(nome);
    await page.getByTestId("input-knight-nickname").fill(apelido);
    await page.getByTestId("input-knight-birthday").fill(dataNascimento);
  }
);

Given(
  "Preenche os atributos do cavalheiro com {string}, {string}, {string}, {string}, {string}, {string}",
  async (
    atributoForca: string,
    atributoDestreza: string,
    atributoConstituicao: string,
    atributoInteligencia: string,
    atributoSabedoria: string,
    atributoCarisma: string
  ) => {
    await page.getByTestId("input-knight-strength").fill(atributoForca);
    await page.getByTestId("input-knight-dexterity").fill(atributoDestreza);
    await page
      .getByTestId("input-knight-constitution")
      .fill(atributoConstituicao);
    await page
      .getByTestId("input-knight-intelligence")
      .fill(atributoInteligencia);
    await page.getByTestId("input-knight-wisdom").fill(atributoSabedoria);
    await page.getByTestId("input-knight-charisma").fill(atributoCarisma);
  }
);

Given(
  "Preenche os dados da arma do cavalheiro com {string}, {string}, {string}",
  async (nomeArma: string, atributoArma: string, modArma: string) => {
    await page.getByTestId("input-knight-weapon-name").fill(nomeArma);
    await page.getByTestId("input-knight-weapon-attribute").fill(atributoArma);
    await page.getByTestId("input-knight-weapon-mod").fill(modArma);
    await page.getByTestId("input-knight-weapon-equipped").click();
  }
);

Given(
  "Selecione o atributo principal {string}",
  async (atributoPrincipal: string) => {
    await page
      .getByTestId("input-knight-keyAttribute")
      .selectOption({ label: atributoPrincipal });
  }
);

Given(
  "Seja possivel localizar o cavalheiro {string} na lista de cavalheiros",
  async (nomeCavalheiro: string) => {
    const cavalheiro = page.getByText(nomeCavalheiro);

    expect(cavalheiro).toBeTruthy();
    expect(cavalheiro).toBeVisible();
  }
);

Given("Clique no botão cadastrar para finalizar o cadastro", async () => {
  await page.getByTestId("knight-form-submit-button").click();
});

Given("Ao selecionar o primeiro cavalheiro", async () => {
  await page.locator("tr").nth(1).click();
});

Given("Seja possivel verificar que seu apelido é {string}", async (apelido) => {
  const apelidoInput = page.getByTestId("input-knight-nickname");
  expect(await apelidoInput.inputValue()).toBe(apelido);
});

Given(
  "Modifica o apelido do cavalheiro para {string}",
  async (apelido: string) => {
    await page.getByTestId("input-knight-nickname").fill(apelido);
  }
);

Given(
  "Seja possivel clicar no botão para torna-lo heroi e confirmar a validação",
  async () => {
    await page.getByTestId("knight-form-delete-button").click();
    await page.getByTestId("confirm-button").click();
  }
);
