export const calculateServicePrice = (
  data,
  selectedYears,
  selectedServices,
  discounts
) => {
  const totalPrice = selectedYears?.reduce((accYears, selectedYear) => {
    const yearTotalPrice = selectedServices?.reduce(
      (accServices, selectedService) => {
        const serviceData = data[selectedYear]?.services?.find(
          (service) => service.name === selectedService
        );

        if (serviceData.requiredServices) {
          return isServiceDisabled(
            serviceData.requiredServices,
            selectedServices
          )
            ? accServices
            : accServices + serviceData.price;
        }
        return accServices + serviceData.price;
      },
      0
    );

    return accYears + yearTotalPrice;
  }, 0);

  const totalDiscount = discounts?.reduce((accDiscount, discount) => {
    return accDiscount + discount.price;
  }, 0);

  return totalPrice - totalDiscount;
};

export const calculateDiscount = (data, year, selectedServices) => {
  const discounts = data[year]?.packages?.map((pack) => {
    const packageServices = pack.services;
    const isPackageIncluded = packageServices.every((packageService) =>
      selectedServices.includes(packageService)
    );

    if (!isPackageIncluded) {
      return null;
    }

    const packagePrice = pack.price;
    const isFreePackagesAvailable = pack?.freeServices?.every((freeService) =>
      selectedServices.includes(freeService)
    );

    const priceWithoutDiscount = packageServices.reduce(
      (accTotalPrice, selectedService) => {
        const serviceData = data[year]?.services?.find(
          (service) => service.name === selectedService
        );
        return accTotalPrice + (serviceData?.price || 0);
      },
      0
    );

    if (isFreePackagesAvailable) {
      const freeServiceDiscount = pack.freeServices.reduce(
        (accFreeServiceDiscount, freeService) => {
          const freeServiceData = data[year].services.find(
            (service) => service.name === freeService
          );
          return accFreeServiceDiscount + (freeServiceData?.price || 0);
        },
        0
      );

      return {
        name: pack.name,
        price: priceWithoutDiscount - packagePrice + freeServiceDiscount,
        year: year,
      };
    }

    return {
      name: pack.name,
      price: priceWithoutDiscount - packagePrice,
      year: year,
    };
  });

  const validDiscounts = discounts?.filter((discount) => discount !== null);

  if (!validDiscounts || validDiscounts.length === 0) {
    return null;
  }

  return validDiscounts.reduce((currentDiscount, nextDiscount) =>
    currentDiscount.price < nextDiscount.price ? nextDiscount : currentDiscount
  );
};

export const getServices = (data) => {
  const transformedData = {};

  for (const year in data) {
    const yearData = data[year];
    if (yearData.services) {
      yearData.services.forEach((service) => {
        const { name: serviceName, requiredServices = [] } = service;

        transformedData[serviceName] = Array.from(new Set(requiredServices));
      });
    }
  }

  return Object.keys(transformedData).map((serviceName) => ({
    name: serviceName,
    requiredService: transformedData[serviceName],
  }));
};

export const getYears = (data) => {
  return Object.keys(data).map((year) => ({ name: year }));
};

export const isServiceDisabled = (requiredService, selectedServices) =>
  !requiredService?.every((r) => selectedServices.includes(r));
