import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('ccd_entity_chart')
export class EntityChart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'chart_name', nullable: false })
  chartName: string;

  //完整的实体-关系图数据
  @Column({ name: 'chart_data', type: 'longtext', nullable: false })
  chartData: string;

  //只包含实体，满足 MySQL(type-orm) 定义的 Shema 格式，不包含图形数据
  @Column({ name: 'entity_schema_json', type: 'longtext', nullable: false })
  entitySchemaJson: string;

  @Column({ name: 'time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  //测试字段，目前版本没有使用
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
