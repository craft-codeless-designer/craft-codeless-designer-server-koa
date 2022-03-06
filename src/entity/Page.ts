import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ccd_page')
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'page_id', nullable: false })
  pageId: string;

  @Column({ name: 'page_name', nullable: false })
  pageName: string;

  @Column({ name: 'page_route', nullable: true })
  pageRoute: string;

  @Column({ name: 'page_data', type: 'longtext', nullable: false })
  pageData: string;

  @Column({ name: 'device_type', nullable: false })
  deviceType: string;

  @Column({ name: 'time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;
}
