import { prisma } from "../../utils/db";

export const _getEventDetailsById = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      createdAt: true,
      title: true,
      description: true,
      image: true,
      startDate: true,
      endDate: true,
      location: true,
      price: true,
      permission: true,
      schoolClub: {
        select: {
          name: true,
          slug: true,
        },
      },
      university: {
        select: {
          name: true,
          slug: true,
        },
      },
      eventType: {
        select: {
          name: true,
          slug: true,
        },
      },
      user: {
        select: {
          name: true,
          surname: true,
          image: true,
        },
      },
    },
  });

  if (!event) {
    throw new Error("Etkinlik bulunamadı.");
  }

  return event;
};

export const _getAllEvents = async (universityId: string) => {
  const events = await prisma.event.findMany({
    where: {
      universityId,
    },
  });

  if (events === null) {
    throw new Error("Etkinlikler getirilemedi.");
  }

  return events;
};
