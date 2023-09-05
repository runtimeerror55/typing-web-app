import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { NavBar } from "../../components/navBar/navBar";
import styles from "./statsPage.module.css";
import { ColorRing } from "react-loader-spinner";
import { colorRingOptions } from "../../utilities/utilities";
import { StatsPage } from "./statsPage";

export const AwaitStatsPage = () => {
      const { loaderData } = useLoaderData();

      return (
            <Suspense
                  fallback={
                        <div className={styles["page"]}>
                              <NavBar></NavBar>
                              <div className={styles["loader"]}>
                                    <ColorRing {...colorRingOptions} />
                              </div>
                        </div>
                  }
            >
                  <Await resolve={loaderData}>
                        <StatsPage></StatsPage>
                  </Await>
            </Suspense>
      );
};
