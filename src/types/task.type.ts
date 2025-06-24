export interface Tasks {
  id: string;
  description: string;
  userId: string;
  public: boolean;
  createdAt?: Date;
  username?: string;
}
