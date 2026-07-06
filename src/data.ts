import { Solution, ModuleItem, Project, Testimonial, Step, Diferencial } from "./types";

export const solutionsData: Solution[] = [
  {
    id: "igrejas",
    title: "Sistema para Igrejas",
    icon: "Church",
    description: "Centralize eventos, estudos bíblicos, comunicação e atividades da igreja em uma plataforma moderna, organizada e fácil de utilizar.",
    targetAudience: "Conecte sua igreja em um único lugar.",
    features: [
      "Gestão de eventos e programações",
      "Biblioteca de sermões, estudos e materiais",
      "Comunicação integrada com a comunidade",
      "Mural de avisos e notificações importantes",
      "Acompanhamento de pequenos grupos ou células",
      "Painel administrativo simples para lideranças"
    ],
    benefits: [
      "Aproximação e engajamento real da sua comunidade",
      "Centralização de toda a comunicação oficial",
      "Acesso simplificado e amigável para todas as idades",
      "Gestão otimizada e organizada das programações",
      "Disponibilização rápida de materiais pastorais"
    ],
    modules: ["login", "perfis", "dashboard", "chat", "agenda", "calendario", "notificacoes", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["Painel Web Suite Hub"],
    faqs: [
      {
        question: "Como funciona o acesso dos membros?",
        answer: "Cada membro pode fazer um cadastro simples para acompanhar as programações, ler estudos e receber comunicados diretamente no celular."
      },
      {
        question: "Podemos separar o conteúdo por grupos ou ministérios?",
        answer: "Sim! É possível direcionar avisos e materiais específicos para jovens, casais, lideranças ou outros ministérios da comunidade."
      },
      {
        question: "O aplicativo é publicado nas lojas oficiais?",
        answer: "Sim! Realizamos e acompanhamos todo o processo de publicação oficial no Google Play e na App Store."
      }
    ]
  },
  {
    id: "clinicas",
    title: "Sistema para Clínicas",
    icon: "Stethoscope",
    description: "Organize atendimentos, reduza faltas e acompanhe seus pacientes por meio de uma plataforma rápida, segura e intuitiva.",
    targetAudience: "Mais organização e menos faltas nas consultas.",
    features: [
      "Agendamento inteligente",
      "Confirmações automáticas via WhatsApp",
      "Histórico completo de pacientes",
      "Controle de escalas dos profissionais de saúde",
      "Painel administrativo para controle da recepção",
      "Perfis completos de pacientes com histórico de visitas"
    ],
    benefits: [
      "Redução drástica no índice de faltas com avisos automáticos",
      "Otimização do tempo de atendimento da recepção",
      "Fácil acesso ao histórico de saúde em poucos cliques",
      "Total segurança e confidencialidade dos dados",
      "Atendimento ao paciente de forma muito mais ágil"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "calendario", "notificacoes", "upload", "painel-admin", "controle-usuarios", "secretaria-ia"],
    integrations: ["Notificações Inteligentes"],
    faqs: [
      {
        question: "Como os dados dos pacientes são armazenados?",
        answer: "Todas as informações e históricos de atendimento são mantidos sob rígidos padrões de segurança digital e privacidade de dados."
      },
      {
        question: "É possível gerenciar mais de um profissional?",
        answer: "Com certeza! Cada médico ou terapeuta conta com uma agenda individualizada, totalmente conectada ao controle central da clínica."
      }
    ]
  },
  {
    id: "eventos",
    title: "Plataforma para Eventos",
    icon: "Ticket",
    description: "Gerencie inscrições, credenciamento, confirmação de presença e interação com os participantes em uma única plataforma.",
    targetAudience: "Organize seu evento do início ao fim.",
    features: [
      "Inscrições online",
      "Credenciamento por QR Code",
      "Mural interativo de fotos",
      "Programação completa do evento atualizada em tempo real",
      "Informações gerais, mapas e localização para convidados",
      "Controle ativo de listas de RSVP e convidados"
    ],
    benefits: [
      "Credenciamento ultrarrápido na portaria sem filas",
      "Maior interação do público através de feed de fotos",
      "Visão exata e em tempo real dos confirmados e presentes",
      "Estatísticas imediatas de comparecimento e satisfação",
      "Sincronização inteligente de dados durante a entrada"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "calendario", "qrcode", "notificacoes", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["Validador de QR Code"],
    faqs: [
      {
        question: "O credenciamento exige internet estável o tempo todo?",
        answer: "Não! A validação de ingressos por QR Code funciona de forma integrada para garantir um fluxo rápido mesmo se houver oscilação de sinal."
      },
      {
        question: "Como funciona o mural de fotos interativo?",
        answer: "Os participantes podem enviar suas fotos diretamente pelo aplicativo, criando um mural coletivo de recordações em tempo real."
      }
    ]
  },
  {
    id: "empresarial",
    title: "Sistema Empresarial",
    icon: "Building",
    description: "Centralize a operação da sua empresa em uma única plataforma. Automatize tarefas, acompanhe indicadores e tome decisões com mais rapidez e segurança.",
    targetAudience: "Tecnologia desenvolvida para impulsionar o seu negócio.",
    features: [
      "Gestão de processos",
      "Controle de equipes",
      "Indicadores e relatórios",
      "Assinatura digital direta na tela do celular",
      "Central de notícias e comunicados para colaboradores",
      "Painel web completo para análise e gestão de relatórios"
    ],
    benefits: [
      "Fim do papel e dos controles manuais ineficientes",
      "Garantia fotográfica e de localização das atividades de campo",
      "Acompanhamento em tempo real do progresso das tarefas",
      "Histórico completo de serviços prestados e relatórios consolidados",
      "Aumento imediato de eficiência operacional e foco da equipe"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "qrcode", "notificacoes", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["Assinatura Digital"],
    faqs: [
      {
        question: "Os técnicos conseguem preencher relatórios onde não há sinal?",
        answer: "Sim! O sistema permite trabalhar offline normalmente. Os dados e fotos são sincronizados automaticamente assim que houver conexão."
      },
      {
        question: "O gestor acompanha o andamento pelo computador?",
        answer: "Sim! Disponibilizamos um painel administrativo web completo para acompanhamento de ordens de serviço e checklists de qualquer lugar."
      }
    ]
  },
  {
    id: "personalizado",
    title: "Projeto 100% Personalizado",
    icon: "Settings",
    description: "Não encontrou uma solução ideal? Desenvolvemos Landing Pages, Sistemas, Aplicativos e SaaS totalmente personalizados, planejados exclusivamente para atender às necessidades do seu projeto.",
    targetAudience: "Desenvolvemos o projeto perfeito para a sua empresa.",
    features: [
      "Planejamento exclusivo para regras de negócio específicas",
      "Design de interface (UI/UX) premium focado na usabilidade",
      "Componentes e módulos desenhados sob medida para seu fluxo",
      "Código de alta fidelidade e de sua inteira propriedade",
      "Gerenciador administrativo web customizado",
      "Liberdade total para evoluir e criar novas funcionalidades"
    ],
    benefits: [
      "Solução perfeitamente moldada ao diferencial competitivo do seu negócio",
      "Sem cobrança de licenciamento por usuário ou anuidades abusivas",
      "Interface moderna de alto impacto visual que gera valor à sua marca",
      "Fácil expansão e scalabilidade contínua",
      "Acompanhamento e consultoria dedicados em todas as fases do projeto"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "calendario", "qrcode", "notificacoes", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["API & Integrações customizadas"],
    faqs: [
      {
        question: "O código-fonte pertence a quem?",
        answer: "O código-fonte é 100% de sua propriedade legal e intelectual, garantindo total liberdade e segurança para sua empresa."
      },
      {
        question: "Como funciona o suporte técnico após a entrega?",
        answer: "Fornecemos suporte técnico ativo e acompanhamento pós-lançamento para garantir a evolução contínua da sua aplicação."
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
  { id: "analytics", name: "Métricas de Uso", icon: "BarChart3", category: "advanced", description: "Monitoramento simples de acessos e telas mais visitadas no app." },
  { id: "secretaria-ia", name: "Secretária IA", icon: "Bot", category: "integrations", description: "Integração de Inteligência Artificial para recolher informações, receber dicas e ter o controle total de fluxos por ela." }
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
    description: "Organizamos todas as funcionalidades, definimos o escopo do projeto e planejamos a estrutura necessária para garantir um desenvolvimento organizado e eficiente. Enviamos um documento com toda a estrutura do projeto e o orçamento."
  },
  {
    number: 3,
    title: "Protótipo Navegável",
    description: "Criamos um protótipo interativo para que você visualize, clique, teste, simule a jornada e aprove a experiência do sistema para sugestão ou alterações antes do desenvolvimento começar. (Essa demonstração não possui custo e é sem compromisso)"
  },
  {
    number: 4,
    title: "Desenvolvimento Ágil",
    description: "Após a aprovação do protótipo, iniciamos o desenvolvimento do sistema utilizando tecnologias modernas, garantindo desempenho, segurança e escalabilidade."
  },
  {
    number: 5,
    title: "Testes de Homologação",
    description: "Antes da entrega, realizamos diversos testes para garantir que todas as funcionalidades estejam funcionando corretamente em diferentes dispositivos, testamos a segurança, comportamento e simulações para garantir robustez absoluta."
  },
  {
    number: 6,
    title: "Publicação Oficial",
    description: "Publicamos sua solução e realizamos toda a configuração necessária, de acordo com a sua preferência para que ela esteja disponível e funcionando com segurança."
  },
  {
    number: 7,
    title: "Suporte e Evolução",
    description: "Após a entrega, continuamos acompanhando o projeto com suporte técnico, melhorias e novas funcionalidades conforme a evolução da sua necessidade. (Consulte o prazo de suporte)"
  }
];

export const differentialsData: Diferencial[] = [
  {
    title: "Valide sua ideia antes de investir",
    description: "Protótipo navegável gratuito para testar e aprovar seu projeto.",
    icon: "Rocket"
  },
  {
    title: "Aumente sua produtividade",
    description: "Automatize tarefas e economize horas de trabalho.",
    icon: "LineChart"
  },
  {
    title: "Fature mais",
    description: "Desenvolvemos soluções que ajudam seu negócio a vender mais e atender melhor seus clientes.",
    icon: "Coins"
  },
  {
    title: "Fortaleça sua marca",
    description: "Interfaces modernas que transmitem profissionalismo e geram confiança.",
    icon: "Star"
  },
  {
    title: "Invista com segurança",
    description: "Seu sistema é desenvolvido exclusivamente para você, sem depender de plataformas limitadas.",
    icon: "Lock"
  },
  {
    title: "Conte conosco depois da entrega",
    description: "Continuamos acompanhando o crescimento da sua solução.",
    icon: "Phone"
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
    id: "meu-casamento-app",
    name: "Meu Casamento",
    description: "Aplicativo completo para controle mensal de cofrinho, planos em fases e comparação de orçamentos de fornecedores.",
    fullDescription: "Um aplicativo financeiro completo desenhado para casais gerenciarem o planejamento financeiro mensal do casamento, controlarem depósitos mensais de economia (cofrinho) e compararem cotações de fornecedores por categoria.",
    category: "Financeiro",
    tech: ["React", "PWA Offline", "Google Firestore", "Tailwind CSS"],
    features: ["Cofrinho de Economias", "Comparação de Orçamentos", "Melhor Opção por Categoria", "Exportação/Importação JSON"],
    demoType: "iframe",
    iframeAppId: "meu-casamento",
    image: "/casamento-1.PNG"
  },
  {
    id: "evento-musical-app",
    name: "Evento Musical",
    description: "Reserva de ingressos, recepção com dados detalhados, organizador com panorama analítico completo e credenciamento ágil.",
    fullDescription: "Protótipo interativo de alta fidelidade projetado para o aplicativo oficial da 8ª Convenção de Quartetos. Oferece fluxos completos de reserva de ingressos, painel da recepção para credenciamento com dados detalhados dos participantes, e portal do organizador com panorama geral e estatísticas em tempo real.",
    category: "Evento",
    tech: ["React", "Vite", "Tailwind CSS", "Motion/React"],
    features: ["Reserva de Ingressos", "Portal de Recepção", "Panorama do Organizador", "Credenciamento por QR Code"],
    demoType: "iframe",
    iframeAppId: "8-convencao-de-quartetos",
    image: "/quarteto.PNG"
  },
  {
    id: "painel-academico-app",
    name: "Painel Acadêmico",
    description: "Organizador e planner acadêmico para gerenciar cronogramas, provas, trabalhos, ementas e anotações de aulas offline.",
    fullDescription: "Um aplicativo planner completo projetado para estudantes organizarem toda a sua jornada acadêmica com máxima eficiência e total segurança offline. Permite registrar e monitorar cronogramas, marcar datas de provas e prazos de trabalhos com alertas visuais de prazo, criar e organizar ementas de disciplinas com leitura direta de arquivos, estruturar anotações detalhadas de aulas por disciplina, e salvar PDFs de horários e calendários diretamente no aparelho usando IndexedDB.",
    category: "Educação",
    tech: ["HTML5", "CSS3 Variables", "Vanilla JavaScript", "IndexedDB Offline", "PDF Viewer Engine"],
    features: [
      "Organizador de Trabalhos & Provas",
      "Anotações Estruturadas por Disciplina",
      "Upload e Leitor Integrado de PDFs",
      "Gerenciador de Ementas do Curso",
      "Backup Completo do Aparelho (JSON com PDFs)"
    ],
    demoType: "iframe",
    iframeAppId: "app-painel-academico",
    image: "/painel.PNG"
  }
];
