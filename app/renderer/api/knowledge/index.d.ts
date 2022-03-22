export interface IAddKnowledge {
  knowledge_title: string;
  knowledge_content: string;
  knowledge_id: string;
  create_time: string;
}

export interface IAddKnowledgeParam {
  knowledge_title: string;
  knowledge_content: string;
}

export interface IGetKnowledgeReturn {
  data: IAddKnowledge[];
  code?: number;
}

export interface IGetKnowledgeParam {
  knowledge_title: string;
  start_time: string;
  end_time: string;
}

export interface IDeleteKnowledgeParam {
  knowledge_id: string;
}

export interface IChangeKnowledgeParam {
  knowledge_title: string;
  knowledge_id: string;
  knowledge_content: string;
}
