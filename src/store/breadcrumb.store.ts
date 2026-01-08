import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { ShallowRef, shallowRef } from 'vue';

export interface BreadcrumbStore {
  breadcrumbs: ShallowRef<BreadcrumbMenu[]>;
  setBreadcrumbs: (breadrumb: BreadcrumbMenu[]) => void;
}

const breadcrumbs = shallowRef<BreadcrumbMenu[]>([]);

const useBreadcrumbStore = (): BreadcrumbStore => {
  const setBreadcrumbs = (newbreadrumb: BreadcrumbMenu[]): void => {
    breadcrumbs.value = newbreadrumb;
  };

  return {
    breadcrumbs,
    setBreadcrumbs,
  };
};

export default useBreadcrumbStore;
