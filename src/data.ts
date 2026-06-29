import { Solution, ModuleItem, Project, Testimonial, Step, Diferencial } from "./types";

export const solutionsData: Solution[] = [
  {
    id: "igrejas",
    title: "Aplicativo para Igrejas",
    icon: "Church",
    description: "Conecte sua comunidade, gerencie eventos, compartilhe sermões, devocionais e facilite contribuições de forma segura e moderna.",
    targetAudience: "Igrejas de todos os tamanhos, ministérios, conselhos e comunidades religiosas.",
    features: [
      "Transmissão de cultos ao vivo e acervo de sermões em vídeo/áudio",
      "Bíblia integrada com planos de leitura e anotações",
      "Gestão de células, pequenos grupos e redes ministeriais",
      "Mural de pedidos de oração interativo e intercessão",
      "Módulo de contribuições e dízimos via Pix/Cartão integrado",
      "Notificações push de avisos importantes e eventos"
    ],
    benefits: [
      "Aumento do engajamento dos membros durante a semana",
      "Facilidade e conveniência na arrecadação de contribuições",
      "Centralização da comunicação oficial da liderança",
      "Inclusão digital de idosos com interface simplificada",
      "Organização digital dos pequenos grupos (células)"
    ],
    modules: ["login", "perfis", "dashboard", "chat", "agenda", "calendario", "qrcode", "pagamentos", "pix", "notificacoes", "whatsapp", "upload", "painel-admin", "controle-usuarios"],
    integrations: ["YouTube API", "Vimeo", "WhatsApp Business", "Gateway de Pagamentos (Asaas, Mercado Pago)", "Google Agenda"],
    faqs: [
      {
        question: "Como funciona a segurança nas contribuições?",
        answer: "Utilizamos integrações com gateways de pagamento homologados pelo Banco Central, criptografados via SSL. Os dados bancários dos membros nunca ficam guardados no aplicativo."
      },
      {
        question: "Podemos separar o conteúdo por grupos de idade?",
        answer: "Sim! É possível definir permissões e canais de notificações específicos para jovens, casais, liderança, etc."
      },
      {
        question: "O app é publicado no Google Play e App Store?",
        answer: "Com certeza! Fazemos todo o processo de publicação nas contas oficiais da sua organização."
      }
    ],
    basePriceEstimate: 4500
  },
  {
    id: "clinicas",
    title: "Aplicativo para Clínicas",
    icon: "Stethoscope",
    description: "Simplifique o agendamento de consultas, automatize confirmações, integre prontuários eletrônicos e ofereça telemedicina com segurança.",
    targetAudience: "Clínicas médicas, consultórios odontológicos, psicólogos, fisioterapeutas e profissionais da saúde.",
    features: [
      "Agendamento de consultas online e cancelamentos automáticos",
      "Lembretes automáticos via push e integração com WhatsApp",
      "Telemedicina nativa com chamada de vídeo criptografada de ponta a ponta",
      "Prontuário eletrônico do paciente integrado com histórico de receitas",
      "Assinatura digital de receitas médicas com padrão ICP-Brasil",
      "Módulo financeiro para controle de faturamento, convênios e coparticipações"
    ],
    benefits: [
      "Redução drástica nas faltas de pacientes com lembretes inteligentes",
      "Otimização do tempo das secretárias e recepcionistas",
      "Praticidade para os pacientes marcarem consultas 24h por dia",
      "Segurança jurídica e conformidade total com a LGPD médica",
      "Histórico de saúde acessível em um só lugar"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "financeiro", "chat", "agenda", "calendario", "qrcode", "pagamentos", "pix", "notificacoes", "whatsapp", "upload", "painel-admin", "controle-usuarios", "analytics"],
    integrations: ["WhatsApp Business API", "Google Calendar", "Memed (Receituário Inteligente)", "Pagar.me", "E-Notas (NFe)"],
    faqs: [
      {
        question: "O aplicativo está em conformidade com a LGPD?",
        answer: "Sim, os dados de saúde dos pacientes são criptografados em trânsito e em repouso, respeitando estritamente a Lei Geral de Proteção de Dados e as diretrizes do CFM."
      },
      {
        question: "É possível integrar com o meu sistema atual de prontuário?",
        answer: "Sim, desde que o seu sistema atual ofereça APIs de integração. Desenvolvemos pontes sob medida."
      }
    ],
    basePriceEstimate: 6200
  },
  {
    id: "eventos",
    title: "Aplicativo para Eventos",
    icon: "Ticket",
    description: "Ofereça venda de ingressos online, credenciamento rápido via QR Code, agenda de palestrantes interativa e networking ativo entre participantes.",
    targetAudience: "Produtores de eventos, congressos, feiras de negócios, casamentos, festivais e simpósios.",
    features: [
      "Venda de ingressos com emissão instantânea de QR Code",
      "Credenciamento offline de alta velocidade na portaria do evento",
      "Programação em tempo real com opção de favoritar palestras",
      "Área de networking para chat privado e troca de cartões de visita digitais",
      "Enquetes ao vivo, votações e perguntas aos palestrantes",
      "Patrocinadores em destaque com banners dinâmicos e cupons"
    ],
    benefits: [
      "Eliminação completa de filas no credenciamento",
      "Novas oportunidades de receita através de cotas de patrocínio digital",
      "Engajamento de participantes com perguntas e gamificação",
      "Controle de acesso em tempo real por áreas ou salas",
      "Coleta de feedback imediata pós-palestra"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "calendario", "qrcode", "pagamentos", "pix", "notificacoes", "upload", "painel-admin", "controle-usuarios", "analytics"],
    integrations: ["Mercado Pago", "Stripe", "WhatsApp API", "E-Notas", "Mailchimp"],
    faqs: [
      {
        question: "O credenciamento funciona se a internet cair?",
        answer: "Sim! Desenvolvemos uma tecnologia de sincronização híbrida que permite validar ingressos offline e sincronizar assim que a conexão retornar."
      },
      {
        question: "Como os patrocinadores aparecem?",
        answer: "Eles ganham banners interativos, notificações patrocinadas personalizadas e podem escanear QR codes de participantes interessados para captar leads."
      }
    ],
    basePriceEstimate: 5000
  },
  {
    id: "financeiro",
    title: "Sistema Financeiro",
    icon: "LineChart",
    description: "Tenha total controle do seu fluxo de caixa, emita cobranças automatizadas via Pix ou boleto, controle inadimplência e tenha relatórios de IA.",
    targetAudience: "Startups, pequenas e médias empresas, prestadores de serviço e comércios.",
    features: [
      "Dashboard analítico com receitas, despesas, margem de lucro e EBITDA",
      "Emissão em lote de cobranças recorrentes (assinaturas)",
      "Regras de cobrança automática via WhatsApp e e-mail antes e após vencimento",
      "Conciliação bancária automática via arquivos OFX ou APIs Open Finance",
      "Contas a pagar e a receber com fluxo de aprovação multinível",
      "Relatórios personalizados e previsões de caixa baseadas em IA"
    ],
    benefits: [
      "Redução drástica na inadimplência através de avisos automatizados",
      "Visibilidade clara da saúde financeira futura do negócio",
      "Economia de horas de trabalho manual com conciliação automática",
      "Facilidade para receber pagamentos via Pix com baixa instantânea",
      "Controle minucioso de custos por centros de custo"
    ],
    modules: ["login", "dashboard", "financeiro", "pagamentos", "pix", "notificacoes", "whatsapp", "ia", "relatorios", "painel-admin", "controle-usuarios", "assinaturas", "analytics"],
    integrations: ["Asaas", "Iugu", "Inter API", "Banco do Brasil API", "Open Finance", "ChatGPT / Gemini API"],
    faqs: [
      {
        question: "Posso emitir Notas Fiscais automaticamente?",
        answer: "Sim! Integramos com serviços líderes como e-notas ou FocusNF para emitir notas fiscais de serviço (NFs) de forma 100% automatizada."
      },
      {
        question: "Como a Inteligência Artificial ajuda no financeiro?",
        answer: "A IA analisa seu histórico de receitas e despesas para prever o fluxo de caixa dos próximos meses, alertando sobre possíveis gargalos ou momentos ideais para investimentos."
      }
    ],
    basePriceEstimate: 7500
  },
  {
    id: "crm",
    title: "CRM Comercial",
    icon: "TrendingUp",
    description: "Centralize seus leads, controle seu funil de vendas, automatize mensagens de WhatsApp e acompanhe o desempenho da equipe em tempo real.",
    targetAudience: "Equipes de vendas, agências, imobiliárias, consultorias e departamentos comerciais.",
    features: [
      "Visualização em Pipeline (Kanban) personalizável das etapas de venda",
      "Distribuição automática de leads (Round-Robin) entre vendedores",
      "Integração direta com formulários do Facebook Ads, Instagram e site",
      "Histórico completo de interações (ligações, e-mails, reuniões)",
      "Automação de mensagens personalizadas no WhatsApp Web ou API",
      "Metas de vendas individuais e por equipe com gráficos dinâmicos"
    ],
    benefits: [
      "Aumento imediato na taxa de conversão com atendimento ágil",
      "Nenhum cliente é esquecido devido aos alertas de tarefas pendentes",
      "Histórico de vendas mantido na empresa, mesmo se o vendedor sair",
      "Decisões baseadas em dados consolidados de CAC, LTV e ticket médio",
      "Comunicação fluida e centralizada"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "notificacoes", "whatsapp", "ia", "relatorios", "painel-admin", "controle-usuarios", "analytics"],
    integrations: ["Meta Ads API", "ActiveCampaign", "RD Station", "Zapier", "Trello"],
    faqs: [
      {
        question: "O CRM funciona integrado ao WhatsApp dos vendedores?",
        answer: "Sim, oferecemos tanto integração via extensão para WhatsApp Web individual quanto centralização através de número único na API oficial de WhatsApp Business."
      },
      {
        question: "Posso criar múltiplos funis de venda?",
        answer: "Com certeza! É possível gerenciar funis separados para novos clientes, pós-venda, renovações, parcerias, etc."
      }
    ],
    basePriceEstimate: 5800
  },
  {
    id: "empresarial",
    title: "Aplicativo Empresarial",
    icon: "Building",
    description: "Digitalize a operação da sua empresa. Controle estoque, equipes externas, ordens de serviço e melhore a comunicação interna.",
    targetAudience: "Empresas de logística, assistência técnica, indústrias, construtoras e varejos distribuídos.",
    features: [
      "Abertura e acompanhamento de Ordens de Serviço (OS) com geolocalização",
      "Controle de estoque de peças e produtos com leitura de código de barras",
      "Assinatura do cliente direto na tela do celular do técnico",
      "Checklist operacional com obrigatoriedade de fotos para vistoria",
      "Comunicação interna direta (Feed de Notícias e Chat corporativo)",
      "Portal administrativo completo com relatórios de produtividade"
    ],
    benefits: [
      "Redução total do uso de papel e burocracia na operação",
      "Comprovação fotográfica e por GPS do serviço prestado",
      "Acompanhamento em tempo real da produtividade das equipes externas",
      "Rastreabilidade de peças de reposição e estoque",
      "Comunicação instantânea e engajamento interno"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "chat", "agenda", "qrcode", "notificacoes", "upload", "painel-admin", "controle-usuarios", "analytics"],
    integrations: ["Google Maps Platform", "ERP SAP", "Totvs", "Senior", "Power BI"],
    faqs: [
      {
        question: "Como o app funciona em locais sem sinal de celular?",
        answer: "Técnicos externos podem realizar vistorias, coletar assinaturas e ler QR Codes mesmo sem internet. Os dados ficam salvos localmente e sobem automaticamente assim que houver rede."
      },
      {
        question: "Dá para integrar com sistemas ERP complexos como TOTVS ou SAP?",
        answer: "Sim. Criamos conectores de banco de dados e APIs customizados que garantem a sincronização contínua das ordens de serviço e do estoque."
      }
    ],
    basePriceEstimate: 8500
  },
  {
    id: "personalizado",
    title: "Aplicativo Personalizado",
    icon: "Settings",
    description: "Tem uma ideia inovadora? Desenvolvemos o seu aplicativo do zero, sob medida, de acordo com o modelo de negócio ideal.",
    targetAudience: "Startups em fase de validação, empresários visionários e projetos inovadores únicos.",
    features: [
      "Modelagem de banco de dados e arquitetura de nuvem escalável",
      "Design de interface (UI/UX) exclusivo baseado em pesquisas de público",
      "Integrações complexas com APIs de terceiros e hardware especializado",
      "Desenvolvimento ágil com entregas incrementais testáveis",
      "Implementação de algoritmos próprios e inteligência artificial",
      "Código limpo, documentado e transferível"
    ],
    benefits: [
      "Solução perfeitamente moldada ao seu diferencial competitivo",
      "Propriedade intelectual 100% sua, sem taxas de licenciamento de terceiros",
      "Arquitetura desenhada para suportar milhões de usuários ativos",
      "Time dedicado de engenharia, design e gerência de projeto",
      "Flexibilidade máxima para evoluir a plataforma"
    ],
    modules: ["login", "cadastro", "perfis", "dashboard", "financeiro", "chat", "agenda", "calendario", "qrcode", "pagamentos", "pix", "notificacoes", "whatsapp", "ia", "relatorios", "upload", "painel-admin", "controle-usuarios", "apis", "assinaturas", "analytics"],
    integrations: ["Qualquer API aberta", "Dispositivos IoT", "Sistemas Legados", "OpenAI / Anthropic SDKs"],
    faqs: [
      {
        question: "Quanto tempo demora para desenvolver do zero?",
        answer: "Varia de acordo com a complexidade, mas um Produto Mínimo Viável (MVP) bem estruturado costuma levar de 8 a 12 semanas para ser lançado."
      },
      {
        question: "A Suite Hub faz a manutenção pós-lançamento?",
        answer: "Sim, oferecemos contratos mensais de suporte, monitoramento 24/7 e evolução contínua para adicionar novas funcionalidades."
      }
    ],
    basePriceEstimate: 12000
  }
];

export const modulesData: ModuleItem[] = [
  { id: "login", name: "Login", icon: "Lock", category: "core", description: "Autenticação segura via e-mail, telefone ou redes sociais.", priceWeight: 300 },
  { id: "cadastro", name: "Cadastro", icon: "UserPlus", category: "core", description: "Fichas completas de usuários com campos personalizados.", priceWeight: 350 },
  { id: "perfis", name: "Perfis", icon: "User", category: "core", description: "Edição de dados de perfil, foto e preferências de uso.", priceWeight: 250 },
  { id: "dashboard", name: "Dashboard", icon: "LayoutDashboard", category: "features", description: "Painel visual com gráficos, resumo de atividades e métricas.", priceWeight: 800 },
  { id: "financeiro", name: "Financeiro", icon: "Wallet", category: "features", description: "Controle de saldo, extratos, receitas e despesas.", priceWeight: 950 },
  { id: "chat", name: "Chat em Tempo Real", icon: "MessageSquare", category: "features", description: "Conversa direta entre usuários com suporte a texto, mídia e lido.", priceWeight: 900 },
  { id: "agenda", name: "Agenda", icon: "Clock", category: "features", description: "Agendamentos, horários disponíveis e gestão de escalas.", priceWeight: 600 },
  { id: "calendario", name: "Calendário", icon: "Calendar", category: "features", description: "Visão mensal/semanal de compromissos e tarefas.", priceWeight: 500 },
  { id: "qrcode", name: "QR Code", icon: "QrCode", category: "integrations", description: "Leitura e geração instantânea de códigos para validações e pagamentos.", priceWeight: 450 },
  { id: "pagamentos", name: "Pagamentos", icon: "CreditCard", category: "integrations", description: "Integração com cartões de crédito e faturamento automatizado.", priceWeight: 1100 },
  { id: "pix", name: "Pix integrado", icon: "Zap", category: "integrations", description: "Geração de Pix Copia e Cola e QR Code com confirmação instantânea.", priceWeight: 800 },
  { id: "notificacoes", name: "Notificações Push", icon: "Bell", category: "features", description: "Envio de alertas na tela do celular mesmo com app fechado.", priceWeight: 500 },
  { id: "whatsapp", name: "WhatsApp Hub", icon: "MessageCircle", category: "integrations", description: "Disparos de alertas transacionais automáticos pelo WhatsApp.", priceWeight: 850 },
  { id: "ia", name: "Inteligência Artificial", icon: "Cpu", category: "advanced", description: "Sugestões inteligentes, resumos e análises automatizadas.", priceWeight: 1500 },
  { id: "relatorios", name: "Relatórios", icon: "FileSpreadsheet", category: "features", description: "Exportação de dados em PDF, Excel ou relatórios interativos.", priceWeight: 600 },
  { id: "upload", name: "Upload de Arquivos", icon: "UploadCloud", category: "features", description: "Armazenamento seguro de fotos, PDFs e mídias de usuários.", priceWeight: 400 },
  { id: "painel-admin", name: "Painel Administrativo", icon: "Sliders", category: "advanced", description: "Sistema web para administradores gerenciarem todo o app.", priceWeight: 1400 },
  { id: "controle-usuarios", name: "Controle de Usuários", icon: "Users", category: "core", description: "Definição de permissões, papéis (admin, operador, cliente).", priceWeight: 400 },
  { id: "apis", name: "APIs e Integrações", icon: "Link2", category: "integrations", description: "Conexão com sistemas ERP, CRMs ou softwares legados.", priceWeight: 1200 },
  { id: "assinaturas", name: "Assinaturas & Recorrência", icon: "RefreshCw", category: "features", description: "Cobranças automáticas mensais, semestrais ou anuais.", priceWeight: 1000 },
  { id: "analytics", name: "Analytics Integrado", icon: "BarChart3", category: "advanced", description: "Monitoramento detalhado de acessos, telas mais vistas e conversões.", priceWeight: 550 }
];

export const stepsData: Step[] = [
  {
    number: 1,
    title: "Entendimento da necessidade",
    description: "Reunião de imersão onde ouvimos sua dor, entendemos seus objetivos comerciais e desenhamos as premissas iniciais do projeto."
  },
  {
    number: 2,
    title: "Planejamento e Escopo",
    description: "Definimos o cronograma detalhado, arquitetura do sistema, estimativa orçamentária de módulos e requisitos de publicação."
  },
  {
    number: 3,
    title: "Protótipo Navegável",
    description: "Desenhamos as telas do aplicativo no Figma e criamos uma versão interativa para você clicar, testar o fluxo e ajustar antes da programação."
  },
  {
    number: 4,
    title: "Desenvolvimento Ágil",
    description: "Nossos engenheiros escrevem o código limpo, modular e de alto desempenho, com entregas frequentes em ambiente de testes."
  },
  {
    number: 5,
    title: "Testes e Homologação",
    description: "Realizamos testes rigorosos de segurança, performance, usabilidade em diferentes marcas de celulares e correções finais."
  },
  {
    number: 6,
    title: "Publicação Oficial",
    description: "Cuidamos de toda a burocracia para colocar seu aplicativo no Google Play Store (Android) e Apple App Store (iOS)."
  },
  {
    number: 7,
    title: "Suporte e Evolução",
    description: "Oferecemos monitoramento constante, backups automáticos, atualizações para novas versões dos celulares e novos módulos."
  }
];

export const differentialsData: Diferencial[] = [
  {
    title: "Desenvolvimento 100% Personalizado",
    description: "Sem templates prontos ou amarras. Seu aplicativo terá a cara da sua marca e as regras de negócio exatas da sua operação.",
    icon: "CodeXml"
  },
  {
    title: "Design de Interface Premium",
    description: "Projetamos interfaces focadas no usuário (UI/UX), elegantes, leves e intuitivas, garantindo engajamento e fidelização imediata.",
    icon: "Palette"
  },
  {
    title: "Alto Desempenho e Velocidade",
    description: "Usamos frameworks de ponta que compilam nativamente, garantindo transições de tela instantâneas e menor consumo de bateria.",
    icon: "Gauge"
  },
  {
    title: "Segurança de Dados Avançada",
    description: "Criptografia de ponta a ponta, conformidade com a LGPD e hospedagem robusta em servidores protegidos do Google Cloud e AWS.",
    icon: "ShieldAlert"
  },
  {
    title: "Código Organizado e Documentado",
    description: "Sua propriedade intelectual é sagrada. Fornecemos um código limpo, modular e de fácil manutenção por qualquer equipe técnica.",
    icon: "FileCode"
  },
  {
    title: "Integrações Fluidas com APIs",
    description: "Conectamos seu aplicativo com gateways de pagamento, plataformas de logística, CRMs e ERPs do mercado de forma transparente.",
    icon: "Puzzle"
  },
  {
    title: "Inteligência Artificial Embarcada",
    description: "Adicione recursos modernos de IA, como assistentes inteligentes, categorização automática, transcrição de voz e análise de dados.",
    icon: "Cpu"
  },
  {
    title: "Painéis Administrativos Completos",
    description: "Gerencie tudo o que acontece no app através de um painel web intuitivo e moderno, com relatórios completos e exportações.",
    icon: "Sliders"
  },
  {
    title: "Escalabilidade Garantida",
    description: "Infraestrutura em nuvem elástica que cresce automaticamente conforme o número de usuários do seu aplicativo dispara.",
    icon: "ChevronsUp"
  },
  {
    title: "Suporte e Evolução Contínua",
    description: "Não te deixamos sozinho após o lançamento. Fornecemos suporte ativo, correções rápidas de bugs e novas atualizações de segurança.",
    icon: "HeartHandshake"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Pr. Marcos Silva",
    role: "Presidente",
    company: "Igreja Restinga",
    content: "O aplicativo desenvolvido pela Suite Hub transformou a nossa comunicação. Conseguimos centralizar os sermões, devocionais e dízimos em um só lugar. Os membros elogiam a facilidade do Pix integrado. Excelente suporte!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "2",
    name: "Dra. Ana Cláudia Lemos",
    role: "Diretora Clínica",
    company: "Clinivida",
    content: "Nossas faltas de consultas caíram 40% com o aplicativo. O lembrete automatizado via WhatsApp e o prontuário eletrônico integrado facilitaram nossa rotina médica. A telemedicina nativa é impecável.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "3",
    name: "Felipe Ferelli",
    role: "Coordenador Geral",
    company: "ExpoTech Sul",
    content: "O credenciamento por QR Code foi um sucesso estrondoso. Validamos mais de 3.000 ingressos com apenas 3 celulares, sem qualquer fila. A área de networking e a agenda de palestras engajaram o público do início ao fim.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const mockPortfolioProjects: Project[] = [
  {
    id: "estudo-biblico",
    name: "APP ESTUDO 2.0 (Igreja)",
    description: "Aplicativo de estudos bíblicos, roteiros de pregações, mural de oração e cadastro de membros.",
    fullDescription: "Desenvolvido sob medida para facilitar o acesso de líderes e membros a devocionais diários, controle de dízimos online, e integração direta com canais de áudio e vídeo da igreja.",
    category: "Igrejas",
    tech: ["React Native", "Firebase", "Tailwind CSS"],
    features: ["Bíblia Online", "Cadastro de Células", "Pedidos de Oração", "Financeiro Integrado"],
    demoType: "iframe",
    iframeAppId: "app-estudo-2-0",
    image: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "clinica-sorria",
    name: "App Med&Clin (Clínicas)",
    description: "Solução premium para clínicas médicas, consultas online, agendamento interativo e telemedicina.",
    fullDescription: "Protótipo interativo mostrando o agendamento dinâmico, chamadas de vídeo de telemedicina seguras, e histórico de prescrições assinado digitalmente pelo profissional de saúde.",
    category: "Clínicas",
    tech: ["React Native", "NodeJS", "WebRTC", "PostgreSQL"],
    features: ["Telemedicina WebRTC", "Lembrete via WhatsApp", "Prontuário Digital", "Calendário Inteligente"],
    demoType: "simulator",
    simulatorPreset: "clinica",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "meu-casamento-app",
    name: "Meu Casamento (Eventos)",
    description: "Aplicativo completo de lista de presentes, confirmação de presença (RSVP), localização do evento e mural de fotos.",
    fullDescription: "Um aplicativo desenhado para engajar convidados, facilitar envio de presentes convertidos em dinheiro, e permitir publicação de fotos em tempo real em um feed exclusivo do casamento.",
    category: "Eventos",
    tech: ["React", "Firebase Firestore", "Tailwind CSS"],
    features: ["Lista de Presentes Pix", "RSVP Digital", "Como Chegar (Maps)", "Feed de Fotos"],
    demoType: "iframe",
    iframeAppId: "meu-casamento",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "esplanada-viva",
    name: "Esplanadaviva (Empresarial)",
    description: "Portal e aplicativo corporativo para gestão de ordens de serviço, controle operacional e fluxo interno.",
    fullDescription: "Projetado para digitalizar processos de vistorias, acompanhamento de projetos em campo com GPS, carregamento de fotos de conformidade e painel administrativo de metas.",
    category: "Empresariais",
    tech: ["React Native", "Google Maps API", "SQL Server"],
    features: ["Ordens de Serviço GPS", "Checklist com Fotos", "Offline First", "Dashboard Gerencial"],
    demoType: "iframe",
    iframeAppId: "esplanadaviva-main",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "finance-hub",
    name: "Suite Finanças (Financeiro)",
    description: "Sistema financeiro integrado com emissão de cobranças automáticas, Pix Pix e fluxo de caixa.",
    fullDescription: "Um poderoso simulador financeiro que demonstra as faturas automáticas via Pix, controle de inadimplentes, e visualização gráfica de fluxo de caixa futuro por Inteligência Artificial.",
    category: "Gestão Financeira",
    tech: ["React", "D3.js", "Express", "Open Finance API"],
    features: ["Boleto & Pix Automático", "Previsão de Fluxo IA", "Conciliação Bancária", "Cobrança via WhatsApp"],
    demoType: "simulator",
    simulatorPreset: "financeiro",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "confirma-rsvp",
    name: "Confirma RSVP (Eventos)",
    description: "Aplicativo de credenciamento e validação de ingressos com leitor de QR Code integrado.",
    fullDescription: "Permite a leitura instantânea de ingressos, controle de acessos em tempo real por portarias, e envio de notificações para lembrete de início de atividades.",
    category: "Eventos",
    tech: ["React", "Tailwind CSS", "HTML5 Camera API"],
    features: ["Leitor QR Code", "Check-in Offline", "Gestão de Lotes", "Sincronização Nuvem"],
    demoType: "iframe",
    iframeAppId: "confirma-main",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&h=400&q=80"
  }
];
