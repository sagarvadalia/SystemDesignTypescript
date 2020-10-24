import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

// Need to handle the association with course
@Entity()
export class Catalog extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, Catalog);
    }

    @PrimaryColumn()
    catalogID: number;

    @Column({ type: 'text', nullable: false })
    courseID: string;
}
