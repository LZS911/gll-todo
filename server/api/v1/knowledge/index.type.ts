export interface IChangeKnowledgeParam {
  knowledge_title: string;
  knowledge_id: string;
  knowledge_content: string;
}

export interface IGetKnowledgeParam {
  knowledge_title?: string;
  start_time: string;
  end_time: string;
}

export interface IDeleteKnowledgeParam {
  knowledge_id: string;
}
