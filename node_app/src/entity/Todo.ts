import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"

@Entity()
export class Todo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  del: boolean;

  @ManyToMany(() => Tag, (tag) => tag.todos)
  tags: Tag[];

}

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  del: boolean;

  @ManyToMany(() => Todo, (todo) => todo.tags)
  @JoinTable()
  todos: Todo[];

}