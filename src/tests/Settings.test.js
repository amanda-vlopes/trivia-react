import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe('A aplicação possui uma tela Settings', () => {
  it('Será verificado se ao clicar no botão Settings na página do login a aplicação é redirecionada para a página Settings na rota /settings', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    userEvent.click(screen.getByTestId('btn-settings'));
    const { pathname } = history.location;

    expect(pathname).toBe('/settings');
    expect(screen.getByTestId('settings-title')).toBeInTheDocument();
  });
})