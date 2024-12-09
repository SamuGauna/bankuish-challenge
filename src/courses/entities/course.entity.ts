import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Course, (course) => course.dependentCourses, {
    nullable: true,
  })
  prerequisite: Course;

  @OneToMany(() => Course, (course) => course.prerequisite)
  dependentCourses: Course[];
}
