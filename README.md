<div align="center">
  <h1>
    <img src="https://skillicons.dev/icons?i=react,nodejs,python,flask" /><br>EndoAI 🇧🇷
  </h1>  
</div>
Repositório destinado ao projeto de dashboard para a startup Cattuccino, da disciplina de Projetos 6, do 6° período no CESAR School.<br>

## Descrição
O projeto desenvolvido é uma interface para um modelo de machine learning que tem como principal diretriz a prevenção de casos de diabetes, <strong>sempre incentivando o usuário a buscar o diagnóstico de um profissional da saúde.</strong> Mais informações podem ser encontradas em nosso <a href="https://sites.google.com/cesar.school/endo-ai/home" target="_blank">google sites</a> e nosso <a href="https://drive.google.com/drive/folders/1NskF5VEnYzHEWuR-ODKwKahWOmKkTWXW?usp=drive_link" target="_blank">drive.</a>

## Requisitos
Para rodar este projeto é necessário cumprir os seguintes requisitos:
- Python 3.12.3 ou superior;
- npm 10.9.2 ou superior;
- node 18.19.1 ou superior

## Execução
Para executar o projeto, é necessário seguir os seguintes passos:
- <strong>Clonando o respositório:</strong>
    - Clone o repositório para a sua máquina usando o comando:
      <dt>
    
          git clone https://github.com/paulo-campos-57/EndoAI.git
      </dt>
  - Em seguida, baixe os seguintes arquivos, e os adiciones nas respectivas pastas:
    - Insira esse arquivo na pasta EndoAI/backend: <a href="https://drive.google.com/drive/folders/1-Kt1PW9iQQM1nk8Suk2EFoSAFXZb6K4_?usp=drive_link" target="_blank">joblib(back-end)</a>
    - [Modelo simplificado] -> Insira esse arquivo na pasta EndoAI/backend/app: <a href="https://drive.google.com/drive/folders/14cqtZLHXhVZD56xHe1-uOF40e4AiiYZE?usp=drive_link" target="_blank">joblib Simp</a>
    - [Modelo simplificado] -> Insira esse arquivo na pasta EndoAI/backend/app: <a href="https://drive.google.com/drive/folders/1XaaaQXEXGgDgDGBM1_JHOj5-3ce5wFuU?usp=drive_link" target="_blank">Modelo KNN Simp</a>
    - [Modelo Extendido] -> Insira esse arquivo na pasta EndoAI/backend/app: <a href="https://drive.google.com/drive/folders/1ex2pqgW9Nxgju46Nj_yoea39fflTJ5tm?usp=drive_link" target="_blank">joblib Ex</a>
    - [Modelo Extendido] -> Insira esse arquivo na pasta EndoAI/backend/app: <a href="https://drive.google.com/drive/folders/1807_LGcBnjhjEGuQ4hsLlcYXex2zANJX?usp=drive_link" target="_blank">Modelo KNN Ex</a>
- <strong>Iniciando o servidor Back-end:</strong>
  - Navegue até a pasta backend do projeto (EndoAI/backend)
  - Inicie o ambiente virtual:
      <dt>
    
          python -m venv venv
      </dt>
  - Em seguida ative o ambiente virtual:
      <dt>
    
          source venv/bin/activate # Para sistemas linux
      </dt>
      <dt>
    
          .\venv\Scripts\activate # Para sistemas windows
      </dt>
  - Instale os requisitos para o back-end no ambiente virtual:
      <dt>
    
          pip install -r requirements.txt
      </dt>
  - <strong>Testando o back-end:</strong>
    - Após a instalação dos requisitos no ambiente virtual, ainda na pasta EndoAI/backend execute o comando:
      <dt>
    
          pytest
      </dt>
  - Após a instalação e testes, navegue até a pasta app (EndoAI/backend/app) e execute o comando:
      <dt>
    
          python ./app.py
      </dt>
  - Com isto, o servidor estará rodando na porta 5000.
- <strong>Iniciando o servidor Fornt-end</strong>
  - Navegue até a pasta de frontend do projeto (EndoAI/frontend/endo-front) e execute o comando: 
      <dt>
  
        npm install
    </dt>
  - <strong>Testando o front-end:</strong>
    - Ainda na pasta EndoAI/frontend/endo-front, execute o comando:
        <dt>
    
          npm test
      </dt>
    - Em seguida, pressione a (para rodar todos os testes)
    - Com a finalização, pressione Ctrl + C para encerrar os testes
  - Após os testes, execcute o comando:
    <dt>
  
        npm start
    </dt>
  - Com isto, o servidor estára rodando na porta 3000, e acessível via url http://localhost:3000/
##
<div align="center">
  <h2>Nossos desenvolvedores</h2>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/paixaoao" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/126728380?v=4" width="100px;" alt="Foto Paixão"/><br>
          <sub>
            <b>Arthur Paixão</b>
          </sub>
        </a>
        <br>
        <sub>aptm@cesar.school</sub>
      </td>
          <td align="center">
        <a href="https://github.com/DiogoHMC" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/116087739?v=4" width="100px;" alt="Foto Diogo"/><br>
          <sub>
            <b>Diogo Henrique</b>
          </sub>
        </a>
        <br>
        <sub>dhmc@cesar.school</sub>
      </td>
      <td align="center">
        <a href="https://github.com/EstelaLacerda" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/117921412?v=4" width="100px;" alt="Foto Estela"/><br>
          <sub>
            <b>Estela Lacerda</b>
          </sub>
        </a>
        <br>
        <sub>elo@cesar.school</sub>
      </td>
      <td align="center">
        <a href="https://github.com/grossiter04" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/116268469?v=4" width="100px;" alt="Foto Rossiter"/><br>
          <sub>
            <b>Gabriel Rossiter</b>
          </sub>
        </a>
        <br>
        <sub>gsr@cesar.school</sub>
      </td>
    </tr>
  </table>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/MatheusGom" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/117746778?v=4" width="100px;" alt="Foto Matheus G"/><br>
          <sub>
            <b>Matheus Gomes</b>
          </sub>
        </a>
        <br>
        <sub>mga@cesar.school</sub>
      </td>
        <td align="center">
        <a href="https://github.com/Mavebibo" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/112356542?v=4" width="100px;" alt="Foto Matheus V"/><br>
          <sub>
            <b>Matheus Vellez</b>
          </sub>
        </a>
        <br>
        <sub>mvbb@cesar.school</sub>
      </td>
          <td align="center">
        <a href="https://github.com/paulo-campos-57" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/77108503?v=4" width="100px;" alt="Foto Paulo"/><br>
          <sub>
            <b>Paulo Campos</b>
          </sub>
        </a>
        <br>
        <sub>pmc3@cesar.school</sub>
      </td>
    </tr>
  </table>
</div>

##

<div align="center">
  <h1>
    <img src="https://skillicons.dev/icons?i=react,nodejs,python,flask" /><br>EndoAI 🇺🇸
  </h1>  
</div>
Repository dedicated to the dashboard project for the startup Cattuccino, from the Projects 6 course, in the 6th semester at CESAR School.<br>

## Description
The developed project is an interface for a machine learning model primarily aimed at preventing diabetes cases, <strong>always encouraging the user to seek a diagnosis from a healthcare professional.</strong> More information can be found on our <a href="https://sites.google.com/cesar.school/endo-ai/home" target="_blank">Google Sites</a> and our <a href="https://drive.google.com/drive/folders/1NskF5VEnYzHEWuR-ODKwKahWOmKkTWXW?usp=drive_link" target="_blank">Drive</a>.

## Requirements
To run this project, the following requirements must be met:
- Python 3.12.3 or higher;
- npm 10.9.2 or higher;
- node 18.19.1 or higher;

## How to run
To run this project, is necessary to follow the following steps:
- <strong>Cloning the repository:</strong>
    - Clone the repository to your machine using the command:
      <dt>
    
          git clone https://github.com/paulo-campos-57/EndoAI.git
      </dt>
  - Then, download the following files and add them to their respective folders:
    - Place this file in the EndoAI/backend folder: <a href="https://drive.google.com/drive/folders/1-Kt1PW9iQQM1nk8Suk2EFoSAFXZb6K4_?usp=drive_link" target="_blank">joblib (back-end)</a>
    - [Simplified Model] -> Place this file in the EndoAI/backend/app folder: <a href="https://drive.google.com/drive/folders/14cqtZLHXhVZD56xHe1-uOF40e4AiiYZE?usp=drive_link" target="_blank">joblib (app)</a>
    - [Simplified Model] -> Place this file in the EndoAI/backend/app folder: <a href="https://drive.google.com/drive/folders/1XaaaQXEXGgDgDGBM1_JHOj5-3ce5wFuU?usp=drive_link" target="_blank">KNN Model</a>
    - [Extended Model] -> Place this file in the EndoAI/backend/app folder: <a href="https://drive.google.com/drive/folders/1ex2pqgW9Nxgju46Nj_yoea39fflTJ5tm?usp=drive_link" target="_blank">joblib Ex</a>
    - [Extended Model] -> Place this file in the EndoAI/backend/app folder: <a href="https://drive.google.com/drive/folders/1807_LGcBnjhjEGuQ4hsLlcYXex2zANJX?usp=drive_link" target="_blank">KNN Model Ex</a>

- <strong>Starting Back-end server:</strong>
  - Go to the project backend folder (EndoAI/backend).
  - Create the virtual enviroment:
      <dt>
    
          python -m venv venv
      </dt>
  - After that start the virtual enviroment:
      <dt>
    
          source venv/bin/activate # For linux system
      </dt>
      <dt>
    
          .\venv\Scripts\activate # For windows system
      </dt>
  - Install the requirements for the back-end in the virtual enviroment:
      <dt>
    
          pip install -r requirements.txt
      </dt>
  - <strong>Testing the back-end:</strong>
    - After installing the requirements at the virtual enviroment, still at the EndoAI/backend folder use the command:
      <dt>
    
          pytest
      </dt>
  - After running the tests and the installation, go to the app folder (EndoAI/backend/app) and use the command:
      <dt>
    
          python ./app.py
      </dt>
  - After that, the server will be running in port 5000.
- <strong>Starting the Front-end server</strong>
  - Go to the project frontend folder (EndoAI/frontend/endo-front) and use the command: 
      <dt>
  
        npm install
    </dt>
  - <strong>Testing the front-end:</strong>
    - Still at the EndoAI/frontend/endo-front folder, use the command:
        <dt>
    
          npm test
      </dt>
    - After that, press a (to run all the tests)
    - Once they're done, press Ctrl + C to finish the tests
  - After the tests, use the command:
    <dt>
  
        npm start
    </dt>
  - After that, the server will be running in port 3000 and accessible via the URL http://localhost:3000/
##
<div align="center">
  <h2>Our Developers</h2>
    <table>
    <tr>
      <td align="center">
        <a href="https://github.com/paixaoao" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/126728380?v=4" width="100px;" alt="Foto Paixão"/><br>
          <sub>
            <b>Arthur Paixão</b>
          </sub>
        </a>
        <br>
        <sub>aptm@cesar.school</sub>
      </td>
          <td align="center">
        <a href="https://github.com/DiogoHMC" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/116087739?v=4" width="100px;" alt="Foto Diogo"/><br>
          <sub>
            <b>Diogo Henrique</b>
          </sub>
        </a>
        <br>
        <sub>dhmc@cesar.school</sub>
      </td>
      <td align="center">
        <a href="https://github.com/EstelaLacerda" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/117921412?v=4" width="100px;" alt="Foto Estela"/><br>
          <sub>
            <b>Estela Lacerda</b>
          </sub>
        </a>
        <br>
        <sub>elo@cesar.school</sub>
      </td>
      <td align="center">
        <a href="https://github.com/grossiter04" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/116268469?v=4" width="100px;" alt="Foto Rossiter"/><br>
          <sub>
            <b>Gabriel Rossiter</b>
          </sub>
        </a>
        <br>
        <sub>gsr@cesar.school</sub>
      </td>
    </tr>
  </table>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/MatheusGom" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/117746778?v=4" width="100px;" alt="Foto Matheus G"/><br>
          <sub>
            <b>Matheus Gomes</b>
          </sub>
        </a>
        <br>
        <sub>mga@cesar.school</sub>
      </td>
        <td align="center">
        <a href="https://github.com/Mavebibo" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/112356542?v=4" width="100px;" alt="Foto Matheus V"/><br>
          <sub>
            <b>Matheus Vellez</b>
          </sub>
        </a>
        <br>
        <sub>mvbb@cesar.school</sub>
      </td>
          <td align="center">
        <a href="https://github.com/paulo-campos-57" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/77108503?v=4" width="100px;" alt="Foto Paulo"/><br>
          <sub>
            <b>Paulo Campos</b>
          </sub>
        </a>
        <br>
        <sub>pmc3@cesar.school</sub>
      </td>
    </tr>
  </table>
</div>
