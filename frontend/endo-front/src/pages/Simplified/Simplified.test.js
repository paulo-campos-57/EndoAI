import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Simplified from '.';
import { ToastContainer } from 'react-toastify';
import fetchMock from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';

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
        await user.click(screen.getByRole('button', { name: /avançar/i }));

        const heightInput = screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)');
        const weightInput = screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)');

        await user.type(heightInput, '180');
        await user.type(weightInput, '80');

        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighBP"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighChol"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="Smoker"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="Fruits"]' }));

        // Passo 3
        await user.click(screen.getByRole('button', { name: /avançar/i }));

        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="PhysActivity"]' }));
        await user.click(screen.getByLabelText('EXCELENTE', { selector: 'input[name="GenHlth"]' }));

        const mentHlthInput = screen.getByLabelText('9. No último mês, em quantos dias sua saúde mental não estava boa?');
        const physHlthInput = screen.getByLabelText('10. No último mês, em quantos dias sua saúde física não estava boa?');

        await user.type(mentHlthInput, '1');
        await user.type(physHlthInput, '1');

        await user.selectOptions(screen.getByLabelText('11. Qual seu nível de escolaridade?'), '6');
        await user.selectOptions(screen.getByLabelText('12. Qual sua renda média anual?'), '8');

        // Submissão
        await user.click(screen.getByRole('button', { name: /enviar/i }));

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
                Education: 6,
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
        await user.click(screen.getByRole('button', { name: /avançar/i }));

        await waitFor(() => {
            expect(screen.getByText('Por favor, preencha todos os campos do formulário antes de enviar.')).toBeInTheDocument();
        });
    });

    test('calculates BMI correctly', async () => {
        renderWithRouter(<Simplified />);
        
        // Advance to step 2 where BMI inputs are
        const user = userEvent.setup();
        
        // Fill required fields in step 1
        await user.type(screen.getByLabelText('Informe o seu nome'), 'Test User');
        await user.selectOptions(screen.getByLabelText('Informe sua idade'), '1');
        await user.click(screen.getByRole('button', { name: /avançar/i }));

        // Now we can test BMI calculation
        const heightInput = screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)');
        const weightInput = screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)');

        await user.type(heightInput, '180');
        await user.type(weightInput, '80');

        // Wait for BMI calculation
        await waitFor(() => {
            const bmiInput = screen.getByTestId('bmi-value');
            expect(bmiInput.value).toBe('24.69');
        });
    });
});