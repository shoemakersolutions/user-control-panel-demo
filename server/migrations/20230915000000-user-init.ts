import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserInit20230915000000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE TABLE company (
                id UUID PRIMARY KEY NOT NULL DEFAULT UUID_GENERATE_V4(),
                name TEXT,
                catchphrase TEXT,
                bs TEXT
            );

            CREATE TABLE users (
                id UUID PRIMARY KEY NOT NULL DEFAULT UUID_GENERATE_V4(),
                externalid INTEGER,
                name TEXT,
                username TEXT,
                email TEXT,
                phone TEXT,
                website TEXT,
                company UUID,
                CONSTRAINT fk_user_company
                    FOREIGN KEY(company)
                        REFERENCES company(id)
            );

            CREATE TABLE user_address (
                id UUID PRIMARY KEY NOT NULL DEFAULT UUID_GENERATE_V4(),
                userid UUID NOT NULL,
                street TEXT,
                suite TEXT,
                city TEXT,
                zipcode TEXT,
                geo JSONB NOT NULL DEFAULT '{}'::JSONB
            );


            ALTER TABLE user_address ADD CONSTRAINT fk_user_id FOREIGN KEY(userid) REFERENCES users(id) ON DELETE CASCADE;
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS app_user;
            DROP TABLE IF EXISTS user_address;
            DROP TABLE IF EXISTS company;
            DROP EXTENSION IF EXISTS "uuid-ossp";
        `);
    }
}