import PropertyType from "../components/category/PropertyType";
import TrendingDestination from "../components/category/TrendingDestination";
import UniqueProperty from "../components/category/UniqueProperties";
import MainLayout from "../layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <TrendingDestination />
      <PropertyType />
      <UniqueProperty />
    </MainLayout>
  );
}
