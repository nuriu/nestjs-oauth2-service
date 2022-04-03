import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1649014776160 implements MigrationInterface {
  name = 'InitialMigration1649014776160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientId" character varying NOT NULL, "clientSecret" character varying NOT NULL, "redirectUris" text NOT NULL, "grants" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6ed9067942d7537ce359e172ff6" UNIQUE ("clientId"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "access_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accessToken" text NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "clientId" uuid, "userId" uuid, CONSTRAINT "PK_f20f028607b2603deabd8182d12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "authorization_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "authorizationCode" text NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "redirectUri" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "clientId" uuid, "userId" uuid, CONSTRAINT "PK_586233caf7e281dc24aaedd1335" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "access_token" ADD CONSTRAINT "FK_c425901c1f66598550020494008" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "access_token" ADD CONSTRAINT "FK_9949557d0e1b2c19e5344c171e9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "authorization_code" ADD CONSTRAINT "FK_ffbeadc85eea5dabbbcaf4f6b0e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "authorization_code" ADD CONSTRAINT "FK_c84c3d4d0e6344f36785f679e47" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "authorization_code" DROP CONSTRAINT "FK_c84c3d4d0e6344f36785f679e47"`,
    );
    await queryRunner.query(
      `ALTER TABLE "authorization_code" DROP CONSTRAINT "FK_ffbeadc85eea5dabbbcaf4f6b0e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "access_token" DROP CONSTRAINT "FK_9949557d0e1b2c19e5344c171e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "access_token" DROP CONSTRAINT "FK_c425901c1f66598550020494008"`,
    );
    await queryRunner.query(`DROP TABLE "authorization_code"`);
    await queryRunner.query(`DROP TABLE "access_token"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "client"`);
  }
}
