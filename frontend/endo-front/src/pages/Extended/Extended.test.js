import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Extended from '.';
import { ToastContainer } from 'react-toastify';
import fetchMock from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';

fetchMock.enableMocks();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

jest.mock('react-icons/fa', () => ({
    FaQuestionCircle: (props) => <div title={props.title} onClick={props.onClick}>QuestionIcon</div>,
}));

describe('Extended Page', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    const renderWithRouter = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: MemoryRouter });
    };

    test('renders the initial step correctly', () => {
        renderWithRouter(<Extended />);

        expect(screen.getByText('Avaliação Extendida')).toBeInTheDocument();
        const nameInput = screen.getByLabelText('Informe o seu nome');
        expect(nameInput).toBeInTheDocument();
    });

    test('navigates through all steps and submits correct data', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ 
            chance_diabetes: '30%',
            feat_imp: {
                feature1: 0.1,
                feature2: 0.2
            }
        }));

        renderWithRouter(
            <>
                <Extended />
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

        await user.click(screen.getByLabelText('Masculino', { selector: 'input[name="Sex"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighBP"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighChol"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="CholCheck"]' }));

        // Passo 3
        await user.click(screen.getByRole('button', { name: /avançar/i }));

        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="Smoker"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="Stroke"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HeartDiseaseorAttack"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="PhysActivity"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="Fruits"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="Veggies"]' }));

        // Passo 4
        await user.click(screen.getByRole('button', { name: /avançar/i }));

        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HvyAlcoholConsump"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="AnyHealthcare"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="NeedDoc"]' }));

        await user.click(screen.getByLabelText('EXCELENTE', { selector: 'input[name="GenHlth"]' }));

        const mentHlthInput = screen.getByLabelText('17. No último mês, em quantos dias sua saúde mental não estava boa?');
        const physHlthInput = screen.getByLabelText('18. No último mês, em quantos dias sua saúde física não estava boa?');

        await user.type(mentHlthInput, '0');
        await user.type(physHlthInput, '0');

        // Passo 5
        await user.click(screen.getByRole('button', { name: /avançar/i }));

        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="DiffWalk"]' }));
        await user.selectOptions(screen.getByLabelText('20. Qual seu nível de escolaridade?'), '6');
        await user.selectOptions(screen.getByLabelText('21. Qual sua renda média anual?'), '8');

        // Submissão
        await user.click(screen.getByRole('button', { name: /enviar/i }));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });

        const call = fetchMock.mock.calls[0];
        const expectedData = {
            HighBP: 0,
            HighChol: 0,
            CholCheck: 0,
            BMI: 24.69,
            Smoker: 0,
            Stroke: 0,
            HeartDiseaseorAttack: 0,
            PhysActivity: 1,
            Fruits: 1,
            Veggies: 1,
            HvyAlcoholConsump: 0,
            AnyHealthcare: 1,
            NoDocbcCost: 0,
            GenHlth: 1,
            MentHlth: 0,
            PhysHlth: 0,
            DiffWalk: 0,
            Sex: 1,
            Age: 1,
            Education: 6,
            Income: 8
        };

        expect(call[0]).toBe('http://localhost:5000/prever_ex');
        expect(call[1].method).toBe('POST');
        expect(JSON.parse(call[1].body)).toEqual(expectedData);
    });

    test('validates form fields before submission', async () => {
        renderWithRouter(
            <>
                <Extended />
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
        renderWithRouter(<Extended />);
        
        const user = userEvent.setup();
        
        await user.type(screen.getByLabelText('Informe o seu nome'), 'Test User');
        await user.selectOptions(screen.getByLabelText('Informe sua idade'), '1');
        await user.click(screen.getByRole('button', { name: /avançar/i }));

        const heightInput = screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)');
        const weightInput = screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)');

        await user.type(heightInput, '180');
        await user.type(weightInput, '80');

        await waitFor(() => {
            const bmiElement = screen.getByTestId('bmi-value');
            expect(bmiElement.value).toBe('24.69');
        });
    });

    test('shows smoker info modal when clicking icon', async () => {
        renderWithRouter(<Extended />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText('Informe o seu nome'), 'Test User');
        await user.selectOptions(screen.getByLabelText('Informe sua idade'), '1');
        
        await user.click(screen.getByRole('button', { name: /avançar/i }));
        await user.type(screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)'), '180');
        await user.type(screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)'), '80');
        await user.click(screen.getByLabelText('Masculino'));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighBP"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighChol"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="CholCheck"]' }));

        await user.click(screen.getByRole('button', { name: /avançar/i }));

        const infoIconWrapper = screen.getByTestId('smoker-info-icon');
        await user.click(infoIconWrapper);

        const modal = screen.getByTestId('smoker-modal');
        expect(modal).toBeInTheDocument();
        expect(modal.textContent).toContain('Consideramos fumante pessoas que já fumaram pelo menos 100 cigarros ao longo da vida');

        const closeButton = screen.getByText('Fechar');
        await user.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText('Consideramos fumante pessoas que já fumaram pelo menos 100 cigarros ao longo da vida')).not.toBeInTheDocument();
        });
    });

    test('shows alcohol info modal when clicking icon', async () => {
        renderWithRouter(<Extended />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText('Informe o seu nome'), 'Test User');
        await user.selectOptions(screen.getByLabelText('Informe sua idade'), '1');
        
        await user.click(screen.getByRole('button', { name: /avançar/i }));
        await user.type(screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)'), '180');
        await user.type(screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)'), '80');
        await user.click(screen.getByLabelText('Masculino'));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighBP"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighChol"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="CholCheck"]' }));

        await user.click(screen.getByRole('button', { name: /avançar/i }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="Smoker"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="Stroke"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HeartDiseaseorAttack"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="PhysActivity"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="Fruits"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="Veggies"]' }));

        await user.click(screen.getByRole('button', { name: /avançar/i }));

        const infoIcon = screen.getByTitle('Clique para mais informações sobre álcool');
        await user.click(infoIcon);

        expect(screen.getByText('Excesso é mais de 14 copos por semana (homens) ou mais de 7 copos (mulheres).')).toBeInTheDocument();

        const closeButton = screen.getByText('Fechar');
        await user.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText('Excesso é mais de 14 copos por semana (homens) ou mais de 7 copos (mulheres).')).not.toBeInTheDocument();
        });
    });

    test('shows doctor followup question when needed', async () => {
        renderWithRouter(<Extended />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText('Informe o seu nome'), 'Test User');
        await user.selectOptions(screen.getByLabelText('Informe sua idade'), '1');
        
        await user.click(screen.getByRole('button', { name: /avançar/i }));
        await user.type(screen.getByLabelText('1. Qual a sua altura? (Escreva em centímetros. Ex: 181)'), '180');
        await user.type(screen.getByLabelText('2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)'), '80');
        await user.click(screen.getByLabelText('Masculino'));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighBP"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HighChol"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="CholCheck"]' }));

        await user.click(screen.getByRole('button', { name: /avançar/i }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="Smoker"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="Stroke"]' }));
        await user.click(screen.getByLabelText('NÃO', { selector: 'input[name="HeartDiseaseorAttack"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="PhysActivity"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="Fruits"]' }));
        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="Veggies"]' }));

        await user.click(screen.getByRole('button', { name: /avançar/i }));

        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="NeedDoc"]' }));

        expect(screen.getByText('Você foi no médico quando precisou?')).toBeInTheDocument();

        await user.click(screen.getByLabelText('SIM', { selector: 'input[name="NoDocbcCost"]' }));

        await waitFor(() => {
            expect(screen.queryByText('Você foi no médico quando precisou?')).not.toBeInTheDocument();
        });
    });
}); 