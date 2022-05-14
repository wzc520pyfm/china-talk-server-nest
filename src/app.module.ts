import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './feature/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './core/interceptors/errors.interceptor';
import { FileModule } from './feature/file/file.module';
import { AuthModule } from './core/auth/auth.module';
import { AndroidVersionModule } from './feature/android-version/android-version.module';
import { CollectionModule } from './feature/collection/collection.module';
import { QuestionModule } from './feature/question/question.module';
import { PostModule } from './feature/post/post.module';
import { PaperModule } from './feature/paper/paper.module';
import { RecordModule } from './feature/record/record.module';
import { KnowledgeModule } from './feature/knowledge/knowledge.module';

@Module({
  imports: [
    /**
     * 将 TypeOrmModule 导入AppModule,并使用ormconfig.json中的配置
     * 其中entities - 要加载并用于此连接的实体。接受要加载的实体类和目录路径
     * synchronize - 指示是否在每次应用程序启动时自动创建数据库架构,生成环境下请务必设为false
     *  - 使用mssql如果遇到项目启动表未创建, 可以设置为true, 在表创建后再设为false
     * 设置autoLoadEntities为true即可自动载入实体---每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中
     */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'wzc520pyf',
      database: 'china_talk_nest',
      entities: ['dist/feature/**/entities/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      // 配置静态服务目录---访问: http://localhost:3000/client目录内/xxx.png
      rootPath: join(__dirname, '..', 'client'),
    }),
    UserModule,
    FileModule,
    AuthModule,
    PostModule,
    AndroidVersionModule,
    CollectionModule,
    QuestionModule,
    PaperModule,
    RecordModule,
    KnowledgeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // 全局拦截器，这里使用全局异常拦截器改写异常消息结构
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {
  // 注入TypeORM 的Connection对象
  constructor(private readonly connection: Connection) {}
}
