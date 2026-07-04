import { Query, Resolver } from "type-graphql";
import { Certificate } from "../schema/Certificate.type";
import { certificatesRepository } from "../repository/contentStore";

@Resolver(() => Certificate)
export class CertificateResolver {
  @Query(() => [Certificate], { description: "Certificados concluídos ou em andamento" })
  certificates(): readonly Certificate[] {
    return certificatesRepository.getAll();
  }
}
