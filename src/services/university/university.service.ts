import { prisma } from "../../utils/db";

export const _getAllUniversities = async ({ universityName }) => {
  const universities = await prisma.university.findMany({
    where: {
      name: {
        contains: universityName,
      },
    },
    orderBy: {
      users: {
        _count: "desc",
      },
    },
  });

  return universities;
};

export const _joinUniversity = async ({ userId, universityId }) => {
  const join = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      selectedUniversityId: universityId,
    },
  });

  if (!!join) {
    throw new Error("Üniversiteye katılım işlemi başarısız.");
  }

  return join;
};

export const _getAllDepartmentsByUser = async (universityId: string) => {
  const departments = await prisma.universityOnDepartment.findMany({
    where: {
      universityId,
    },
    select: {
      department: true,
    },
  });

  return departments;
};

export const _getAllClasses = async (departmentId: string, level: number) => {
  const classes = await prisma.class.findMany({
    where: {
      departmentId: departmentId,
      level: level,
    },
  });

  return classes;
};
