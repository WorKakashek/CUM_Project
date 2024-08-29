import {
  Container,
  Filters,
  ModelsGroupList,
  SortCategBar,
  Title,
} from "@/components/shared";
import { findModels, GetSearchParams } from "@/lib/find-models";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  // const categories = await prisma.threeModelCategory.findMany({
  //   include: {
  //     threemodel: {
  //       include: {
  //         Filters: true,
  //       },
  //     },
  //   },
  // });
  const categories = await findModels(searchParams);
  return (
    <>
      <Container className=" mt-5">
        <Title text="All models" size="lg" className=" font-extrabold" />
      </Container>
      <SortCategBar />
      <Container className="pb-14">
        <div className="flex gap-12">
          {/* Filters */}
          <div className="sticky top-0 z-9">
            <Filters />
          </div>
          {/* Products */}
          <div className=" flex-1">
            <div className=" flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.threemodel.length > 0 && (
                    <ModelsGroupList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      models={category.threemodel}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
