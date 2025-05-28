import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Simplified from '.';
import { ToastContainer } from 'react-toastify';
import fetchMock from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom'; // Adicione esta importação

fetchMock.enableMocks();

// Mantenha o mock do useNavigate como está
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

jest.mock('react-icons/fa', () => ({
    FaQuestionCircle: () => <div>QuestionIcon</div>,
}));

describe('Simplified Page', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    // Função auxiliar para renderizar o componente com o router
    const renderWithRouter = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: MemoryRouter });
    };

    test('renders the initial step correctly', () => {
        renderWithRouter(<Simplified />);
        screen.debug();

        expect(screen.getByText('Avaliação Simplificada')).toBeInTheDocument();
        const nameInput = screen.getByLabelText('Informe o seu nome');
        expect(nameInput).toBeInTheDocument();
    });

    test('navigates through all steps and submits correct data', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ chance_diabetes: '30%' }));

        renderWithRouter(
            <>
                <Simplified />
                <ToastContainer />
            </>
        );

        const user = userEvent.setup();

        // Passo 1
        await user.type(screen.getByLabelText('Informe o seu nome'), 'João Silva');
        await user.selectOptions(screen.getByLabelText('Informe sua idade'), '1');

        // Passo 2
        await user.click(screen.getByText('Avançar'));

        await user.type(screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)'), '180');
        await user.type(screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)'), '80');

        const highBpNo = screen.getByLabelText('NÃO', { selector: 'input[name="HighBP"]' });
        await user.click(highBpNo);
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighChol"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="Smoker"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="Fruits"]' }));

        // Passo 3
        await user.click(screen.getByText('Avançar'));

        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="PhysActivity"]' }));
        await user.click(screen.getByLabelText('EXCELENTE', { selector: 'input[name="GenHlth"]' }));

        const mentHlthInput = screen.getByLabelText('9. No último mês, em quantos dias sua saúde mental não estava boa?');
        await user.type(mentHlthInput, '1');

        const physHlthInput = screen.getByLabelText('10. No último mês, em quantos dias sua saúde física não estava boa?');
        await user.type(physHlthInput, '1');

        const educationSelect = screen.getByLabelText('11. Qual seu nível de escolaridade?');
        await user.selectOptions(educationSelect, '6'); // Corrigido para valor válido (1-6)

        const incomeSelect = screen.getByLabelText('12. Qual sua renda média anual?');
        await user.selectOptions(incomeSelect, '8');

        // Submissão
        await user.click(screen.getByText('Enviar'));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(1);
            const call = fetchMock.mock.calls[0];

            const expectedData = {
                HighBP: 0,
                HighChol: 0,
                BMI: 24.69,
                Smoker: 0,
                Fruits: 1,
                PhysActivity: 1,
                GenHlth: 1,
                MentHlth: 1,
                PhysHlth: 1,
                Age: 1,
                Education: 6, // Corrigido para valor válido
                Income: 8
            };

            expect(call[0]).toBe('http://localhost:5000/prever');
            expect(call[1].method).toBe('POST');
            expect(JSON.parse(call[1].body)).toEqual(expectedData);
        });
    });

    test('validates form fields before submission', async () => {
        renderWithRouter(
            <>
                <Simplified />
                <ToastContainer />
            </>
        );

        const user = userEvent.setup();
        await user.click(screen.getByText('Avançar'));

        await waitFor(() => {
            expect(screen.getByText('Por favor, preencha todos os campos do formulário antes de enviar.')).toBeInTheDocument();
        });
    });

    test('calculates BMI correctly', async () => {
        renderWithRouter(<Simplified />);

        const heightInput = screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)');
        const weightInput = screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)');

        fireEvent.change(heightInput, { target: { value: '180' } });
        fireEvent.change(weightInput, { target: { value: '80' } });

        await waitFor(() => {
            expect(screen.getByDisplayValue('24.69')).toBeInTheDocument();
        });
    });
});