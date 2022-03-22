export interface IChangeNoteParam {
  note_title: string;
  note_id: string;
  note_content: string;
}

export interface IGetNoteParam {
  note_title?: string;
  start_time: string;
  end_time: string;
}

export interface IDeleteNoteParam {
  note_id: string;
}
