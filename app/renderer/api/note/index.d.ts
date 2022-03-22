export interface IAddNoteParam {
  note_title: string;
  note_content: string;
}
export interface IAddNote {
  note_title: string;
  note_content: string;
  note_id: string;
  create_time: string;
}

export interface IGetNoteParam {
  note_title: string;
  start_time: string;
  end_time: string;
}

export interface IGetNoteReturn {
  data: IAddNote[];
  code?: number;
}

export interface IDeleteNoteParam {
  note_id: string;
}

export interface IChangeNoteParam {
  note_title: string;
  note_id: string;
  note_content: string;
}
