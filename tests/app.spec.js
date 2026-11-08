import { test, expect } from "@playwright/test";

const activePanel = (page) => page.getByRole("tabpanel");
const firstTitle = "Primeiros passos com JSX";
const firstComplete = (page) =>
  activePanel(page).getByRole("button", {
    name: `Concluir aula: ${firstTitle}`,
    exact: true,
  });

// Cada teste usa um navegador isolado: não altera o progresso de quem está usando o app.
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("carrega sem erros e pagina os 12 conteúdos respeitando os limites", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Que bom ter você por aqui",
  );
  await expect(activePanel(page).getByRole("article")).toHaveCount(6);
  await expect(
    page.getByRole("button", { name: "Página anterior", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Página 1", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page
    .getByRole("button", { name: "Próxima página", exact: true })
    .click();
  await expect(
    activePanel(page).getByRole("heading", { name: "Efeitos com useEffect" }),
  ).toBeVisible();
  await expect(
    activePanel(page).getByRole("heading", { name: firstTitle }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Próxima página", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Página 1", exact: true }).click();
  await expect(
    activePanel(page).getByRole("heading", { name: firstTitle }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("filtro, busca sem acento e estado vazio trabalham juntos", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Próxima página", exact: true })
    .click();
  const dropdown = page.getByRole("button", { name: /Filtrar por categoria:/ });
  await dropdown.click();
  await page.getByRole("option", { name: "Aplicação", exact: true }).click();
  await expect(dropdown).toHaveAttribute("aria-expanded", "false");
  await expect(activePanel(page).getByRole("article")).toHaveCount(4);
  await expect(
    page.getByRole("button", { name: "Página 1", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.getByRole("searchbox", { name: "Buscar aulas" }).fill("pecas");
  await expect(
    activePanel(page).getByRole("heading", {
      name: "Conectando todas as peças",
    }),
  ).toBeVisible();
  await page
    .getByRole("searchbox", { name: "Buscar aulas" })
    .fill("assunto-que-nao-existe");
  await expect(
    activePanel(page).getByRole("heading", { name: "Nenhuma aula por aqui" }),
  ).toBeVisible();
  await expect(activePanel(page).getByRole("article")).toHaveCount(0);
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(activePanel(page).getByRole("article")).toHaveCount(6);
  await expect(dropdown).toContainText("Todas as categorias");
});

test("menu fecha por clique fora e Escape, com seleção por teclado", async ({
  page,
}) => {
  const dropdown = page.getByRole("button", { name: /Filtrar por categoria:/ });
  await dropdown.click();
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.getByRole("heading", { name: "Sua próxima descoberta" }).click();
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await dropdown.focus();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("option", { name: "Todas as categorias" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(dropdown).toContainText("Fundamentos");
  await expect(dropdown).toBeFocused();
  await dropdown.click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await expect(dropdown).toBeFocused();
});

test("concluir aula atualiza Context, barra, toast, aba e armazenamento", async ({
  page,
}) => {
  await firstComplete(page).click();
  await expect(
    page.getByRole("progressbar", { name: "Progresso da trilha" }),
  ).toHaveAttribute("aria-valuenow", "8");
  await expect(page.locator(".sidebar-note")).toContainText(
    "1 de 12 passos dados",
  );
  await expect(page.locator(".toast--success")).toContainText("Aula concluída");
  await page.getByRole("button", { name: "Fechar notificação" }).click();
  await expect(page.locator(".toast")).toHaveCount(0);
  await page.getByRole("tab", { name: /^Concluídas/ }).click();
  await expect(activePanel(page).getByRole("article")).toHaveCount(1);
  await expect(
    activePanel(page).getByRole("heading", { name: firstTitle }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("trilha:completed:v1")),
    ),
  ).toEqual([1]);
  await page.reload();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "8",
  );
  await expect(
    page.getByRole("button", { name: `Desmarcar aula: ${firstTitle}` }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("toast desaparece sozinho e desmarcar a última aula mostra estado vazio", async ({
  page,
}) => {
  await firstComplete(page).click();
  await expect(page.locator(".toast")).toBeVisible();
  await expect(page.locator(".toast")).toHaveCount(0, { timeout: 6500 });
  await page.getByRole("tab", { name: /^Concluídas/ }).click();
  await page
    .getByRole("button", { name: `Desmarcar aula: ${firstTitle}` })
    .click();
  await expect(page.locator(".toast--info")).toBeVisible();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await expect(
    activePanel(page).getByRole("heading", {
      name: "Suas conquistas vão aparecer aqui",
    }),
  ).toBeVisible();
});

test("abas têm teclado e acordeão expande apenas uma resposta por vez", async ({
  page,
}) => {
  await page.getByRole("tab", { name: /^Todas as aulas/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /^Concluídas/ })).toBeFocused();
  await expect(page.getByRole("tab", { name: /^Concluídas/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: "Dúvidas frequentes" }),
  ).toHaveAttribute("aria-selected", "true");
  const first = page.getByRole("button", {
    name: "Como funciona a trilha de estudos?",
  });
  const second = page.getByRole("button", {
    name: "Meu progresso fica salvo?",
  });
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: "Como funciona a trilha de estudos?" }),
  ).toBeVisible();
  await second.click();
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("tab", { name: "Dúvidas frequentes" }).focus();
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("tab", { name: /^Todas as aulas/ }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(activePanel(page).getByRole("article")).toHaveCount(6);
});

test("leitura em modal fecha com Escape, devolve foco e permite concluir", async ({
  page,
}) => {
  const open = page.getByRole("button", { name: `Abrir aula: ${firstTitle}` });
  await open.click();
  const dialog = page.getByRole("dialog", { name: firstTitle });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Veja na prática" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(open).toBeFocused();
  await open.click();
  await dialog
    .getByRole("button", { name: "Concluir aula", exact: true })
    .click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "8",
  );
  await page.getByRole("button", { name: "Continuar aprendendo" }).click();
  await expect(
    page.getByRole("dialog", { name: "Pensando em componentes" }),
  ).toBeVisible();
});

test("reiniciar exige confirmação e limpa o progresso persistido", async ({
  page,
}) => {
  const reset = page.getByRole("button", {
    name: "Reiniciar progresso",
    exact: true,
  });
  await expect(reset).toBeDisabled();
  await firstComplete(page).click();
  await reset.click();
  await page.getByRole("button", { name: "Manter meu progresso" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "8",
  );
  await reset.click();
  await page.getByRole("button", { name: "Sim, reiniciar" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await expect(reset).toBeDisabled();
  await page.reload();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("trilha:completed:v1")),
    ),
  ).toEqual([]);
});

test("dados locais inválidos não impedem a inicialização", async ({ page }) => {
  await page.evaluate(() =>
    localStorage.setItem("trilha:completed:v1", "{json-invalido"),
  );
  await page.reload();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await page.evaluate(() =>
    localStorage.setItem(
      "trilha:completed:v1",
      JSON.stringify([1, 1, 999, "2", null]),
    ),
  );
  await page.reload();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "8",
  );
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("trilha:completed:v1")),
    ),
  ).toEqual([1]);
});

for (const [name, width, height] of [
  ["celular", 375, 812],
  ["tablet", 768, 1024],
  ["desktop", 1440, 1000],
]) {
  test(`layout ${name} não transborda e mantém as ações acessíveis`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const checkWidth = async () =>
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    await checkWidth();
    await page.getByRole("button", { name: /Filtrar por categoria:/ }).click();
    await expect(
      page.getByRole("option", { name: "Aplicação", exact: true }),
    ).toBeVisible();
    await checkWidth();
    await page.keyboard.press("Escape");
    await page
      .getByRole("button", { name: `Abrir aula: ${firstTitle}` })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await checkWidth();
    const dialogBounds = await page.getByRole("dialog").boundingBox();
    expect(dialogBounds.x).toBeGreaterThanOrEqual(0);
    expect(dialogBounds.x + dialogBounds.width).toBeLessThanOrEqual(width);
    await page.keyboard.press("Escape");
    await firstComplete(page).click();
    await expect(page.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "8",
    );
  });
}
