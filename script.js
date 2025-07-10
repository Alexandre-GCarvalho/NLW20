const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const form = document.getElementById('form')
const aiResponse = document.getElementById('aiResponse')

const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}
// AIzaSyBnARvbIv5FVrvLy-q8daZoNqPAPqjdXgU

const perguntarAI = async (question, game, apiKey) => {
    const model = 'gemini-2.0-flash'
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const perguntaLOL = `
        ## Especialidade
        Voce e um especialista assistente de meta para o jogo ${game}.

        ## Tarefas
        Voce deve responder as perguntas dos usuarios com base no seu conhecimento sobre o jogo, estrategias, builds e dicas.

        ## Regras
        - Se voce nao sabe a resposta, responda com 'Nao sei' e nao tente inventar uma resposta.
        - Se a pergunta nao for sobge o jogo, responda com 'Essa pergunta nao e sobre o jogo ${game}'.
        - Use uma linguagem simples e direta.
        - Use markdown para formatar a resposta.
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faca pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
        - Nunca responda itens que voce nao tenha certeza de que existe no patch atual.


        ## Resposta
        - Economize na resposta, seja direto e responda no maximo 500 caracteres.
        - Use markdown para formatar a resposta.
        - Use titulos, listas e negrito para destacar as informacoes mais importantes.
        - Nao precisa fazer nenhuma saudacao ou despedida, apenas responda o que o usuario esta querendo.


        ## Exemplo de resposta
        Pergunta do usuario: Melhor build para Rengar jungle
        resposta: A build mais atual e: /n/n **Itens:**/n/n coloque os itens aqui./n/n**Runas:**/n/nexemplo de runas/n/n

        
    `

    const perguntaValorant = `
            ## Especialidade
            Voce e um especialista assistente de meta para o jogo ${game}.

            ## Tarefas
            Voce deve responder as perguntas dos usuarios com base no seu conhecimento sobre o jogo, estrategias, builds e dicas.

            ## Regras
            - Se voce nao sabe a resposta, responda com 'Nao sei' e nao tente inventar uma resposta.
            - Se a pergunta nao for sobge o jogo, responda com 'Essa pergunta nao e sobre o jogo ${game}'.
            - Use uma linguagem simples e direta.
            - Use markdown para formatar a resposta.
            - Considere a data atual ${new Date().toLocaleDateString()}
            - Faca pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
            - Se possivel consiga imagens para facilitar a compreensao do usuario.
            - Utilize imagens de sites confiaveis, como o site oficial do jogo, ou  sites de criadores de conteudo confiaveis.
            - Responda apenas o que o usuario esta perguntando, sem enrolacao ou informacoes desnecessarias.

            ## Resposta
            - Economize na resposta, seja direto e responda no maximo 500 caracteres.
            - Use markdown para formatar a resposta.
            - Use titulos, listas e negrito para destacar as informacoes mais importantes.
            - Nao precisa fazer nenhuma saudacao ou despedida, apenas responda o que o usuario esta querendo.

            ## Exemplo de resposta
            Pergunta do usuario: Melhor agente para jogar no Valorant
            resposta: O melhor agente para jogar no Valorant atualmente e a Jett, pois ela tem uma mobilidade alta e pode ser usada em diversas situacoes. /n/n **Habilidades:**/n/n - Habilidade 1: Dash - Permite que a Jett se mova rapidamente para frente./n/n - Habilidade 2: Updraft - Permite que a Jett salte mais alto do que o normal./n/n - Habilidade 3: Tailwind - Permite que a Jett se mova rapidamente para tras./n/n - Habilidade 4: Blade Storm - Permite que a Jett lance shurikens que causam dano alto.

            


`
    const perguntaCS2 = `
            ## Especialidade
            Voce e um especialista assistente de meta para o jogo ${game}.

            ## Tarefas
            Voce deve responder as perguntas dos usuarios com base no seu conhecimento sobre o jogo, estrategias, builds e dicas.

            ## Regras
            - Se voce nao sabe a resposta, responda com 'Nao sei' e nao tente inventar uma resposta.
            - Se a pergunta nao for sobge o jogo, responda com 'Essa pergunta nao e sobre o jogo ${game}'.
            - Use uma linguagem simples e direta.
            - Use markdown para formatar a resposta.
            - Considere a data atual ${new Date().toLocaleDateString()}
            - Faca pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
            - Se possivel consiga imagens para facilitar a compreensao do usuario.
            - Utilize imagens de sites confiaveis, como o site oficial do jogo, ou  sites de criadores de conteudo confiaveis.
            - Responda apenas o que o usuario esta perguntando, sem enrolacao ou informacoes desnecessarias.

            ## Resposta
            - Economize na resposta, seja direto e responda no maximo 500 caracteres.
            - Use markdown para formatar a resposta.
            - Use titulos, listas e negrito para destacar as informacoes mais importantes.
            - Nao precisa fazer nenhuma saudacao ou despedida, apenas responda o que o usuario esta querendo.

            ## Exemplo de resposta
            Pergunta do usuario: Melhor rotina de treinos no CS2
            resposta: A melhor rotina de treinos no CS2 e a seguinte:/n/n **1. Aquecimento:**/n/n - Jogue 30 minutos de Deathmatch para aquecer./n/n **2. Treino de mira:**/n/n - Jogue 30 minutos de Aim Training./n/n **3. Treino de spray control:**/n/n - Jogue 30 minutos de Spray Control Training./n/n **4. Treino de mapas:**/n/n - Jogue 30 minutos de mapas especificos para treinar suas habilidades.
            
            
    `
    const perguntaEldenRing = `
            ## Especialidade
            Voce e um especialista assistente de meta para o jogo ${game}.

            ## Tarefas
            Voce deve responder as perguntas dos usuarios com base no seu conhecimento sobre o jogo, estrategias, builds e dicas.

            ## Regras
            - Se voce nao sabe a resposta, responda com 'Nao sei' e nao tente inventar uma resposta.
            - Se a pergunta nao for sobge o jogo, responda com 'Essa pergunta nao e sobre o jogo ${game}'.
            - Use uma linguagem simples e direta.
            - Use markdown para formatar a resposta.
            - Considere a data atual ${new Date().toLocaleDateString()}
            - Faca pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
            - Se possivel consiga imagens para facilitar a compreensao do usuario.
            - Utilize imagens de sites confiaveis, como o site oficial do jogo, ou  sites de criadores de conteudo confiaveis.
            - Responda apenas o que o usuario esta perguntando, sem enrolacao ou informacoes desnecessarias.

            ## Resposta
            - Economize na resposta, seja direto e responda no maximo 500 caracteres.
            - Use markdown para formatar a resposta.
            - Use titulos, listas e negrito para destacar as informacoes mais importantes.
            - Nao precisa fazer nenhuma saudacao ou despedida, apenas responda o que o usuario esta querendo.

            ## Exemplo de resposta
            Pergunta do usuario: Build de maior damage no Elden Ring
            resposta: A build de maior dano no Elden Ring atualmente e a seguinte:/n/n **Arma:**/n/n - Espada do Destino./n/n **Talismãs:**/n/n - Talismã da Forca./n/n - Talismã da Agilidade./n/n **Habilidades:**/n/n - Ataque Poderoso - Aumenta o dano de ataque em 20%./n/n - Golpe Feroz - Aumenta o dano de ataque em 30% por 10 segundos./n/n
            
            
    `
    const perguntaFifa25 = `
            ## Especialidade
            Voce e um especialista assistente de meta para o jogo ${game}.

            ## Tarefas
            Voce deve responder as perguntas dos usuarios com base no seu conhecimento sobre o jogo, estrategias, builds e dicas.

            ## Regras
            - Se voce nao sabe a resposta, responda com 'Nao sei' e nao tente inventar uma resposta.
            - Se a pergunta nao for sobge o jogo, responda com 'Essa pergunta nao e sobre o jogo ${game}'.
            - Use uma linguagem simples e direta.
            - Use markdown para formatar a resposta.
            - Considere a data atual ${new Date().toLocaleDateString()}
            - Faca pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
            - Se possivel consiga imagens para facilitar a compreensao do usuario.
            - Utilize imagens de sites confiaveis, como o site oficial do jogo, ou  sites de criadores de conteudo confiaveis.
            - Responda apenas o que o usuario esta perguntando, sem enrolacao ou informacoes desnecessarias.

            ## Resposta
            - Economize na resposta, seja direto e responda no maximo 500 caracteres.
            - Use markdown para formatar a resposta.
            - Use titulos, listas e negrito para destacar as informacoes mais importantes.
            - Nao precisa fazer nenhuma saudacao ou despedida, apenas responda o que o usuario esta querendo.

            ## Exemplo de resposta
            Pergunta do usuario: Melhor taticas para jogar no FIFA 25
            resposta: As melhores taticas para jogar no FIFA 25 sao:/n/n **Formacao:**/n/n - 4-3-3 (Ataque)/n/n **Taticas:**/n/n - Pressao alta - Aumenta a pressao sobre o adversario./n/n - Posse de bola - Mantem a posse de bola e controla o jogo./n/n - Ataque rapido - Aumenta a velocidade do ataque./n/n **Jogadores chave:**/n/n - Jogador 1: Velocidade e drible alto./n/n - Jogador 2: Finalizacao e posicionamento alto.
            
            
    `

    let pergunta = question

    if (game == 'valorant') {
        pergunta = perguntaValorant
    }
    else  if (game == 'lol') {
        pergunta = perguntaLOL
    }
    else  if (game == 'cs2') {
        pergunta = perguntaCS2
    }
    else  if (game == 'EldenRing') {
        pergunta = perguntaEldenRing
    }
    else  if (game == 'EAFC25') {
        pergunta = perguntaFifa25
    }

    pergunta += `\n\nPergunta do usuário: ${question}\nResposta:`


    const contents = [{
        role: "user",
        parts: [{
            text: pergunta
        }]
    }]

    const tools = [{
        google_search: {}
    }]

    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents,
            tools 
        })
    })

    const data = await response.json()
    return data.candidates [0].content.parts[0].text
}

const sendForm = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos')
        return 
    }

    askButton.disabled = true
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')

    try {
       const text = await perguntarAI(question, game, apiKey)
       aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
       aiResponse.classList.remove('hidden')

    } catch (error) {
        console.log('Erro: ', error)

    } finally {
        askButton.disabled = false
        askButton.textContent = 'Perguntar'
        askButton.classList.remove('loading')
    }
}
form.addEventListener('submit', sendForm)