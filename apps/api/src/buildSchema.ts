import "reflect-metadata";
import { buildSchema, type BuildSchemaOptions } from "type-graphql";
import { ProfileResolver } from "./resolvers/Profile.resolver";
import { SkillResolver } from "./resolvers/Skill.resolver";
import { ProjectResolver } from "./resolvers/Project.resolver";
import { TimelineResolver } from "./resolvers/Timeline.resolver";
import { CertificateResolver } from "./resolvers/Certificate.resolver";

const resolvers: BuildSchemaOptions["resolvers"] = [
  ProfileResolver,
  SkillResolver,
  ProjectResolver,
  TimelineResolver,
  CertificateResolver,
];

let schemaPromise: ReturnType<typeof buildSchema> | undefined;

/** Constrói o GraphQLSchema a partir dos resolvers decorados com TypeGraphQL — uma única vez por processo. */
export function getSchema() {
  if (!schemaPromise) {
    // validate: false — não usamos decorators de validação (@MinLength etc.), então
    // evitamos a dependência opcional em class-validator.
    schemaPromise = buildSchema({ resolvers, emitSchemaFile: false, validate: false });
  }
  return schemaPromise;
}
