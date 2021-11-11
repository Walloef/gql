import React, { useEffect, useState } from 'react';
import styles from '../styles/Pagination.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Pagination = ({ totalAmountOfPages }) => {
  const paginationArray = [...new Array(totalAmountOfPages)].map(
    (_, i) => i + 1
  );
  const { asPath, query, route } = useRouter();
  const [pagination, setPagination] = useState(paginationArray);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    window.addEventListener('resize', resize);
    resize();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      const pageNumber = parseInt(query.page, 10);

      if (pageNumber === 1 || route === '/') {
        setPagination(paginationArray.filter((p) => p < 4));
      } else {
        setPagination(
          paginationArray.filter(
            (p) =>
              parseInt(query.page, 10) - 1 === p ||
              parseInt(query.page, 10) === p ||
              parseInt(query.page, 10) + 1 === p
          )
        );
      }
    } else {
      setPagination(paginationArray);
    }
  }, [query, isMobile]);

  return (
    <div className={styles.paginationWrapper}>
      {pagination.map((p, i) => {
        return (
          <Link key={i} href="/page/[page]" as={`/page/${p}`}>
            <a
              className={
                `/page/${p}` === asPath || (route === '/' && p === 1)
                  ? styles.activePagination
                  : styles.paginationLink
              }
            >
              {p}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default Pagination;
