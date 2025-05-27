import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Simplified from '.';
import { ToastContainer } from 'react-toastify';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

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

    test('renders the initial step correctly', () => {
        render(<Simplified />)
        screen.debug(); // Debug 1: Mostra o HTML inicial

        expect(screen.getByText('Avaliação Simplificada')).toBeInTheDocument();
        const nameInput = screen.getByLabelText('Informe o seu nome');
        expect(nameInput).toBeInTheDocument();
    });

    test('navigates through all steps and submits correct data', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ chance_diabetes: '30%' }));

        render(
            <>
                <Simplified />
                <ToastContainer />
            </>
        );

        console.log('=== INÍCIO DO TESTE ===');
        screen.debug(); // Debug 2: Estado inicial

        const user = userEvent.setup();

        // Passo 1
        console.log('=== PREENCHENDO PASSO 1 ===');
        await user.type(screen.getByLabelText('Informe o seu nome'), 'João Silva');
        await user.selectOptions(screen.getByLabelText('Informe sua idade'), '1');
        screen.debug(); // Debug 3: Após preencher passo 1

        // Passo 2
        console.log('=== AVANÇANDO PARA PASSO 2 ===');
        await user.click(screen.getByText('Avançar'));
        screen.debug(); // Debug 4: Após avançar para passo 2

        await user.type(screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)'), '180');
        await user.type(screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)'), '80');

        // Debug para verificar os radio buttons
        const highBpNo = screen.getByLabelText('NÃO', { selector: 'input[name="HighBP"]' });
        console.log('HighBP No:', highBpNo.checked);

        await user.click(highBpNo);
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighChol"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="Smoker"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="Fruits"]' }));

        screen.debug(); // Debug 5: Após preencher passo 2

        // Passo 3
        console.log('=== AVANÇANDO PARA PASSO 3 ===');
        await user.click(screen.getByText('Avançar'));
        screen.debug(); // Debug 6: Após avançar para passo 3

        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="PhysActivity"]' }));
        await user.click(screen.getByLabelText('EXCELENTE', { selector: 'input[name="GenHlth"]' }));

        const mentHlthInput = screen.getByLabelText('9. No último mês, em quantos dias sua saúde mental não estava boa?');
        await user.type(mentHlthInput, '1');

        const physHlthInput = screen.getByLabelText('10. No último mês, em quantos dias sua saúde física não estava boa?');
        await user.type(physHlthInput, '1');

        // Verificando selects
        const educationSelect = screen.getByLabelText('11. Qual seu nível de escolaridade?');
        console.log('Education Select Options:', educationSelect.innerHTML);
        await user.selectOptions(educationSelect, '13');

        const incomeSelect = screen.getByLabelText('12. Qual sua renda média anual?');
        await user.selectOptions(incomeSelect, '8');

        screen.debug(); // Debug 7: Após preencher passo 3

        // Submissão
        console.log('=== SUBMETENDO FORMULÁRIO ===');
        await user.click(screen.getByText('Enviar'));

        await waitFor(() => {
            screen.debug(); // Debug 8: Após submissão

            expect(fetchMock).toHaveBeenCalledTimes(1);
            const call = fetchMock.mock.calls[0];
            console.log('API Call:', {
                url: call[0],
                method: call[1].method,
                body: JSON.parse(call[1].body)
            });

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
                Education: 13,
                Income: 8
            };

            expect(call[0]).toBe('http://localhost:5000/prever');
            expect(call[1].method).toBe('POST');
            expect(JSON.parse(call[1].body)).toEqual(expectedData);
        });
    });

    test('validates form fields before submission', async () => {
        render(
            <>
                <Simplified />
                <ToastContainer />
            </>
        );

        screen.debug(); // Debug 9: Estado inicial do teste de validação

        const user = userEvent.setup();
        await user.click(screen.getByText('Avançar'));

        await waitFor(() => {
            screen.debug(); // Debug 10: Após tentativa de avanço sem preencher
            expect(screen.getByText('Por favor, preencha todos os campos do formulário antes de enviar.')).toBeInTheDocument();
        });
    });

    test('calculates BMI correctly', async () => {
        render(<Simplified />);
        screen.debug(); // Debug 11: Estado inicial do teste de BMI

        const heightInput = screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)');
        const weightInput = screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)');

        fireEvent.change(heightInput, { target: { value: '180' } });
        fireEvent.change(weightInput, { target: { value: '80' } });

        console.log('Height:', heightInput.value);
        console.log('Weight:', weightInput.value);

        await waitFor(() => {
            screen.debug(); // Debug 12: Após preencher altura e peso
            const bmiValue = screen.getByDisplayValue('24.69');
            console.log('BMI encontrado:', bmiValue ? bmiValue.value : 'Não encontrado');
            expect(bmiValue).toBeInTheDocument();
        });
    });
});