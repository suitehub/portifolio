import { Solution, ModuleItem, Project, Testimonial, Step, Diferencial } from "./types";

export const solutionsData: Solution[] = [
  {
    id: "igrejas",
    title: "Aplicativo para Igrejas",
    icon: "Church",
    description: "Conecte sua comunidade, gerencie eventos, compartilhe sermões, devocionais e estudos bíblicos integrados diretamente com o Google Firestore.",
    targetAudience: "Igrejas, ministérios, conselhos e comunidades religiosas.",
    features: [
      "Acervo de sermões, áudios e vídeos integrados",
      "Bíblia online com planos de leitura e devocionais diários",
      "Gestão de células, pequenos grupos e liderança",
      "Mural de pedidos de oração, intercessão e notícias",
      "Notificações push em tempo real para avisos importantes",
      "Cadastro e controle de membros integrado"
    ],
    benefits: [
      "Aumento do engajamento dos membros no dia a dia",
      "Centralização da comunicação oficial da igreja",
      "Inclusão digital de idosos com interface simplificada",
      "Organização digital dos pequenos grupos (células)",
      "Sincronização imediata de conteúdo pastoral"
    ],
    modules: ["login", "perfis", "dashboard", "chat", "agenda", "calendario", "notificacoes", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["Google Firestore"],
    faqs: [
      {
        question: "Como funciona a segurança e privacidade?",
        answer: "Utilizamos a infraestrutura de segurança de dados do Google Firestore, garantindo que as informações dos membros fiquem estritamente privadas."
      },
      {
        question: "Podemos separar o conteúdo por redes ou faixas etárias?",
        answer: "Sim! É possível organizar grupos de oração, células e canais de notificações específicos para jovens, casais, liderança, etc."
      },
      {
        question: "O app é publicado oficial no Google Play e App Store?",
        answer: "Com certeza! Fazemos todo o processo de publicação nas contas oficiais da sua organização."
      }
    ]
  },
  {
    id: "clinicas",
    title: "Aplicativo para Clínicas",
    icon: "Stethoscope",
    description: "Simplifique o agendamento de consultas de pacientes, acompanhe escalas médicas e acesse prontuários digitais com rapidez e segurança no banco de dados.",
    targetAudience: "Clínicas médicas, consultórios odontológicos, psicólogos e profissionais da saúde.",
    features: [
      "Agendamento interativo de consultas online 24h",
      "Lembretes de consultas para pacientes via push e WhatsApp",
      "Histórico de prontuários digitais estruturado no Firestore",
      "Controle de escalas e horários disponíveis dos profissionais",
      "Painel administrativo para controle das secretárias e recepção",
      "Perfis completos de pacientes com histórico de visitas"
    ],
    benefits: [
      "Redução drástica nas faltas de pacientes com lembretes automáticos",
      "Otimização do fluxo de trabalho da recepção",
      "Fácil acesso ao histórico de saúde em um só lugar",
      "Segurança de dados médicos centralizados de forma segura",
      "Comunicação direta e humanizada com o paciente"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "calendario", "notificacoes", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["Google Firestore"],
    faqs: [
      {
        question: "Como os dados dos pacientes são salvos?",
        answer: "Os dados de saúde e cadastros são armazenados de forma isolada e segura no Google Firestore, seguindo rigorosos padrões de conformidade e privacidade."
      },
      {
        question: "É possível gerenciar múltiplos profissionais na mesma clínica?",
        answer: "Sim! Cada médico ou profissional tem sua agenda individualizada integrada a um painel geral de recepção."
      }
    ]
  },
  {
    id: "eventos",
    title: "Aplicativo para Eventos",
    icon: "Ticket",
    description: "Ideal para casamentos, congressos e feiras. Ofereça confirmação de presença (RSVP), credenciamento via QR Code e mural interativo de fotos.",
    targetAudience: "Produtores de congressos, casamentos, organizadores de festivais e feiras de negócios.",
    features: [
      "Confirmação de presença online (RSVP) em tempo real",
      "Credenciamento rápido de participantes através de leitor QR Code",
      "Mural interativo de fotos para convidados publicarem memórias",
      "Programação oficial do evento com lista de palestras e atividades",
      "Localização integrada para guiar os convidados facilmente",
      "Lista de presentes ou informações detalhadas do evento"
    ],
    benefits: [
      "Eliminação de filas e credenciamento ágil na portaria",
      "Engajamento dos participantes com publicação de fotos e enquetes",
      "Controle exato da lista de convidados e confirmados",
      "Visualização rápida de estatísticas de comparecimento",
      "Sincronização offline-first para credenciamento"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "calendario", "qrcode", "notificacoes", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["Google Firestore"],
    faqs: [
      {
        question: "O credenciamento funciona sem internet estável?",
        answer: "Sim! O sistema pode validar a lista de QR Codes localmente e sincronizar as presenças no Google Firestore assim que a conexão for restabelecida."
      },
      {
        question: "Como funciona o mural de fotos dos convidados?",
        answer: "Os convidados tiram fotos pelo app ou fazem upload de imagens que aparecem imediatamente em um feed compartilhado do evento."
      }
    ]
  },
  {
    id: "empresarial",
    title: "Aplicativo Empresarial",
    icon: "Building",
    description: "Digitalize a operação de vistorias, ordens de serviço e checklists de equipes externas com fotos e coordenadas geográficas.",
    targetAudience: "Empresas com equipes externas, prestadoras de serviço, vistorias e assistência técnica.",
    features: [
      "Abertura e controle de Ordens de Serviço (OS) em campo",
      "Checklists operacionais com obrigatoriedade de fotos de vistoria",
      "Geolocalização das vistorias registradas na hora",
      "Assinatura do cliente coletada diretamente na tela do celular",
      "Feed de notícias internas e avisos corporativos importantes",
      "Painel web completo para administradores acompanharem o progresso"
    ],
    benefits: [
      "Eliminação total de blocos de papel e preenchimento manual",
      "Garantia fotográfica e de localização de que o serviço foi prestado",
      "Acompanhamento em tempo real das equipes externas no mapa",
      "Histórico de vistorias e relatórios centralizados de forma segura",
      "Aumento drástico da produtividade das equipes de campo"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "qrcode", "notificacoes", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["Google Firestore"],
    faqs: [
      {
        question: "Como o técnico trabalha em locais sem sinal de celular?",
        answer: "O aplicativo permite preencher relatórios, tirar fotos e colher assinaturas offline. Assim que houver conexão, tudo é enviado ao Google Firestore."
      },
      {
        question: "O painel administrativo é acessível pelo computador?",
        answer: "Com certeza! Os administradores têm um painel web completo para criar tarefas, delegar OS e monitorar os relatórios enviados."
      }
    ]
  },
  {
    id: "personalizado",
    title: "Aplicativo Personalizado",
    icon: "Settings",
    description: "Desenhamos e codificamos seu aplicativo do absoluto zero utilizando banco de dados escalável Google Firestore e design exclusivo.",
    targetAudience: "Startups, empreendedores e negócios com fluxos operacionais únicos.",
    features: [
      "Arquitetura sob medida baseada no Google Firestore",
      "Design de interface (UI/UX) único alinhado com sua marca",
      "Componentes interativos desenvolvidos sob demanda",
      "Código limpo, documentado, modular e 100% de sua propriedade",
      "Acesso completo ao painel de administração web",
      "Sincronização e atualizações constantes"
    ],
    benefits: [
      "Solução perfeitamente alinhada com seu diferencial competitivo",
      "Sem cobrança de licenciamento por usuários ou taxas abusivas",
      "Design moderno que gera alta credibilidade no mercado",
      "Facilidade extrema para acrescentar novos recursos no futuro",
      "Acompanhamento dedicado de ponta a ponta na criação"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "calendario", "qrcode", "notificacoes", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["Google Firestore"],
    faqs: [
      {
        question: "Qual o banco de dados utilizado?",
        answer: "Utilizamos o Google Firestore, garantindo escalabilidade automática, segurança avançada de ponta e sincronização em tempo real."
      },
      {
        question: "A Suite Hub oferece suporte após a publicação?",
        answer: "Sim! Disponibilizamos suporte técnico ativo para garantir que seu aplicativo continue funcionando perfeitamente."
      }
    ]
  }
];

export const modulesData: ModuleItem[] = [
  { id: "login", name: "Login", icon: "Lock", category: "core", description: "Autenticação segura via e-mail ou telefone." },
  { id: "cadastro", name: "Cadastro", icon: "UserPlus", category: "core", description: "Fichas de usuários com campos personalizados." },
  { id: "perfis", name: "Perfis", icon: "User", category: "core", description: "Edição de dados de perfil, fotos e preferências de uso." },
  { id: "dashboard", name: "Dashboard", icon: "LayoutDashboard", category: "features", description: "Painel visual com gráficos simples e resumo de atividades." },
  { id: "chat", name: "Chat em Tempo Real", icon: "MessageSquare", category: "features", description: "Conversa direta entre usuários ou com a equipe de suporte." },
  { id: "agenda", name: "Agenda", icon: "Clock", category: "features", description: "Agendamentos, horários disponíveis e gestão de reservas." },
  { id: "calendario", name: "Calendário", icon: "Calendar", category: "features", description: "Visão mensal/semanal de compromissos e tarefas." },
  { id: "qrcode", name: "QR Code", icon: "QrCode", category: "integrations", description: "Leitura de códigos para confirmações e credenciamento ágil." },
  { id: "notificacoes", name: "Notificações Push", icon: "Bell", category: "features", description: "Envio de alertas instantâneos na tela do aparelho celular." },
  { id: "whatsapp", name: "WhatsApp Direct", icon: "MessageCircle", category: "integrations", description: "Direcionamento e lembretes amigáveis para atendimento via WhatsApp." },
  { id: "upload", name: "Upload de Arquivos", icon: "UploadCloud", category: "features", description: "Armazenamento de fotos de vistorias, devocionais ou perfis no Firestore." },
  { id: "painel-admin", name: "Painel Administrativo", icon: "Sliders", category: "advanced", description: "Sistema web para administradores controlarem conteúdos e cadastros." },
  { id: "controle-usuarios", name: "Controle de Usuários", icon: "Users", category: "core", description: "Níveis de acesso diferenciados (admin, operador, cliente)." },
  { id: "analytics", name: "Métricas de Uso", icon: "BarChart3", category: "advanced", description: "Monitoramento simples de acessos e telas mais visitadas no app." }
];

export const stepsData: Step[] = [
  {
    number: 1,
    title: "Entendimento da necessidade",
    description: "Conversamos para entender seus objetivos, alinhar expectativas e analisar os requisitos do projeto."
  },
  {
    number: 2,
    title: "Planejamento e Escopo",
    description: "Definimos as funcionalidades fundamentais, telas essenciais e a estrutura de dados no Firestore."
  },
  {
    number: 3,
    title: "Protótipo Navegável",
    description: "Desenhamos as telas do aplicativo para você clicar, testar o fluxo e ajustar tudo visualmente antes do código."
  },
  {
    number: 4,
    title: "Desenvolvimento Ágil",
    description: "Nossos programadores codificam o aplicativo de forma limpa, rápida e otimizada com Firebase Firestore."
  },
  {
    number: 5,
    title: "Testes de Homologação",
    description: "Realizamos testes rigorosos de funcionamento, usabilidade em diferentes aparelhos e correções finais."
  },
  {
    number: 6,
    title: "Publicação Oficial",
    description: "Cuidamos de todo o processo para disponibilizar seu aplicativo nas lojas oficiais (Google Play e App Store)."
  },
  {
    number: 7,
    title: "Suporte e Evolução",
    description: "Oferecemos suporte técnico ativo para garantir estabilidade e realizar melhorias contínuas."
  }
];

export const differentialsData: Diferencial[] = [
  {
    title: "Desenvolvimento Sob Medida",
    description: "Aplicativos alinhados com a sua marca e processos de negócio, sem templates genéricos.",
    icon: "CodeXml"
  },
  {
    title: "Design de Interface Limpo",
    description: "Aparência elegante, fluida e extremamente fácil de usar por qualquer tipo de público.",
    icon: "Palette"
  },
  {
    title: "Desempenho Otimizado",
    description: "Telas leves com carregamento instantâneo, transições fluidas e economia de bateria.",
    icon: "Gauge"
  },
  {
    title: "Segurança com Firestore",
    description: "Regras rígidas de segurança no banco de dados e controle seguro de acessos.",
    icon: "ShieldAlert"
  },
  {
    title: "Código Limpo e Documentado",
    description: "Sua propriedade intelectual garantida em um código modular de facílima manutenção.",
    icon: "FileCode"
  },
  {
    title: "Leitura Ágil de QR Code",
    description: "Validação instantânea e credenciamento na portaria de eventos mesmo offline.",
    icon: "Puzzle"
  },
  {
    title: "Upload de Mídias e Fotos",
    description: "Envio rápido de fotos para relatórios, vistorias ou mural do evento.",
    icon: "UploadCloud"
  },
  {
    title: "Painel de Administração Web",
    description: "Gerenciamento completo das informações do aplicativo através de um painel web intuitivo.",
    icon: "Sliders"
  },
  {
    title: "Banco de Dados em Tempo Real",
    description: "Sincronização imediata de dados com a tecnologia líder do Google Firestore.",
    icon: "ChevronsUp"
  },
  {
    title: "Suporte e Cuidado Ativo",
    description: "Acompanhamento próximo pós-lançamento para que seu app esteja sempre no ar e seguro.",
    icon: "HeartHandshake"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Pr. Marcos Silva",
    role: "Presidente",
    company: "Igreja Restinga",
    content: "O aplicativo desenvolvido pela Suite Hub transformou nossa comunicação. Conseguimos organizar devocionais e avisos em um só lugar de maneira muito simples e segura no Firestore.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "2",
    name: "Dra. Ana Cláudia Lemos",
    role: "Diretora Clínica",
    company: "Clinivida",
    content: "O agendamento integrado e o controle de escalas reduziu o trabalho manual na nossa secretaria. Os prontuários ficam organizados e os pacientes adoraram a praticidade.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "3",
    name: "Felipe Ferelli",
    role: "Coordenador Geral",
    company: "ExpoTech Sul",
    content: "O leitor de QR Code para check-in de credenciais foi fantástico. Conseguimos validar todos os convidados sem lentidão na portaria. Toda a lista de presenças atualizou na hora.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const mockPortfolioProjects: Project[] = [
  {
    id: "estudo-biblico",
    name: "APP ESTUDO 2.0 (Igreja)",
    description: "Aplicativo de estudos bíblicos, roteiros de pregações, mural de oração e devocionais.",
    fullDescription: "Desenvolvido sob medida para facilitar o acesso de líderes e membros a devocionais diários, mural de pedidos de oração e estudos bíblicos estruturados no Google Firestore.",
    category: "Igrejas",
    tech: ["React Native", "Google Firestore", "Tailwind CSS"],
    features: ["Bíblia Online", "Cadastro de Células", "Pedidos de Oração", "Notificações Push"],
    demoType: "iframe",
    iframeAppId: "app-estudo-2-0",
    image: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "clinica-sorria",
    name: "App Med&Clin (Clínicas)",
    description: "Solução prática para clínicas médicas, agendamentos interativos de consultas e controle de escalas.",
    fullDescription: "Protótipo interativo mostrando o agendamento de consultas com médicos parceiros, visualização das especialidades disponíveis e consulta de prontuários simples no Firestore.",
    category: "Clínicas",
    tech: ["React Native", "Google Firestore", "Tailwind CSS"],
    features: ["Agendamento Online", "Lembrete via WhatsApp", "Prontuário Digital", "Calendário de Escalas"],
    demoType: "simulator",
    simulatorPreset: "clinica",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "meu-casamento-app",
    name: "Meu Casamento (Eventos)",
    description: "Aplicativo completo de lista de presentes sugeridos, confirmação de presença (RSVP), localização do evento e mural interativo de fotos.",
    fullDescription: "Um aplicativo desenhado para engajar convidados, facilitar RSVP digital com estatísticas em tempo real, e permitir publicação de fotos dos convidados diretamente no feed do evento.",
    category: "Eventos",
    tech: ["React", "Google Firestore", "Tailwind CSS"],
    features: ["RSVP Digital", "Como Chegar (Maps)", "Feed de Fotos", "Sugestão de Presentes"],
    demoType: "iframe",
    iframeAppId: "meu-casamento",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "esplanada-viva",
    name: "Esplanadaviva (Empresarial)",
    description: "Portal e aplicativo corporativo para registro de vistorias, checklists externos com fotos e ordens de serviço.",
    fullDescription: "Projetado para digitalizar processos de vistorias, acompanhamento de progresso com coordenadas de localização de equipes externas, fotos e painel de controle administrativo.",
    category: "Empresariais",
    tech: ["React Native", "Google Firestore", "Tailwind CSS"],
    features: ["Ordens de Serviço", "Checklist com Fotos", "Geolocalização OS", "Painel Administrativo"],
    demoType: "iframe",
    iframeAppId: "esplanadaviva-main",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "confirma-rsvp",
    name: "Confirma RSVP (Eventos)",
    description: "Aplicativo de credenciamento rápido e validação de ingressos ou convidados com leitor de QR Code integrado.",
    fullDescription: "Permite a leitura instantânea de ingressos por câmera, controle de check-in na portaria em tempo real e sincronização automática no Firestore.",
    category: "Eventos",
    tech: ["React", "Google Firestore", "Tailwind CSS"],
    features: ["Leitor QR Code", "Check-in Integrado", "Gestão de Convidados", "Banco em Tempo Real"],
    demoType: "iframe",
    iframeAppId: "confirma-main",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&h=400&q=80"
  }
];
