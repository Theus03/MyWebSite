import { Query, Resolver } from "type-graphql";
import { TimelineItem } from "../schema/TimelineItem.type";
import { timelineRepository } from "../repository/contentStore";

@Resolver(() => TimelineItem)
export class TimelineResolver {
  @Query(() => [TimelineItem], { description: "Linha do tempo de carreira e formação, em ordem de exibição" })
  timeline(): readonly TimelineItem[] {
    return timelineRepository.getAll();
  }
}
