import { ActivatedRoute } from '@angular/router';
export const extractRouterParam = (
  route: ActivatedRoute,
  paramName: string
): string => {
  const param = route.snapshot.paramMap.get(paramName);

  return param ? param : '';
};
