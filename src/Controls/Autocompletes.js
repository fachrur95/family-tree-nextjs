// /* eslint-disable */
import React, { forwardRef, useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ButtonGroup } from "@mui/material";
import { Controller } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { connect, useDispatch, useSelector } from "react-redux";
import Controls from "./Controls";
import * as fnFill from "../../Configs/_redux/actions/fillAutocompleteActions";
import * as fnFillPublic from "../../Configs/_redux/actions/publics/publicsActions";

const styles = {
  popper: {
    width: "fit-content",
  },
};

const PER_PAGE_LOAD = 150;

const Autocompletes = forwardRef((props, ref) => {
  const {
    control,
    name,
    nameSearch,
    label,
    fnGetFill,
    onChange,
    dataSelected,
    disableClearable,
    secName,
    disabled,
    inputRef,
    btnSearch,
    filter = false,
    rules,
    errors,
    onKeyUp,
    hide = false,
    required,
  } = props;
  const [didMount, setDidMount] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [direct, setDirect] = useState("left");

  const dispatch = useDispatch();
  const fillData = useSelector((state) => state.fillData);
  const publics = useSelector((state) => state.publics);

  const loadPrevData = () => {
    setDirect("right");
    setPage(page - 1);
  };

  const loadNextData = () => {
    setDirect("left");
    setPage(page + 1);
  };

  const ListboxComponent = forwardRef(function ListboxComponentInner(
    props,
    ref
  ) {
    return (
      // <Slide direction={direct} in={!isLoading} mountOnEnter unmountOnExit>
      <ul
        ref={ref}
        id={props.id}
        className={props.className}
        onMouseDown={props.onMouseDown}
        role={props.role}
      >
        {props.children}
        {count > PER_PAGE_LOAD && (
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="outlined primary button group"
            fullWidth
          >
            <Controls.Button
              size="small"
              text="Prev"
              onClick={loadPrevData}
              disabled={page === 0 || isLoading}
            />
            <Controls.Button
              size="small"
              text="Next"
              onClick={loadNextData}
              disabled={
                !(count - page * PER_PAGE_LOAD >= PER_PAGE_LOAD) || isLoading
              }
            />
          </ButtonGroup>
        )}
      </ul>
      // </Slide>
    );
  });

  // const PopperMy = function (props) {
  //   return <Popper {...props} style={styles.popper} placement="bottom-start" />;
  // };

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      setIsLoading(true);
      switch (fnGetFill) {
        case "fillProducts":
          await dispatch(
            fnFill.getFillProducts(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillProductCategories":
          await dispatch(
            fnFill.getFillProductCategories(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected
            )
          );
          break;
        case "fillProductTypes":
          await dispatch(
            fnFill.getFillProductTypes(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillProductUoms":
          await dispatch(
            fnFill.getFillProductUoms(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillProductGroups":
          await dispatch(
            fnFill.getFillProductGroups(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected
            )
          );
          break;
        case "fillBrands":
          await dispatch(
            fnFill.getFillBrands(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillRacks":
          await dispatch(
            fnFill.getFillRacks(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillTaxes":
          await dispatch(
            fnFill.getFillTaxes(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillStores":
          await dispatch(
            fnFill.getFillStores(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillStoresDestine":
          await dispatch(
            fnFill.getFillStoresDestine(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected
            )
          );
          break;
        case "fillWarehouses":
          filter &&
            (await dispatch(
              fnFill.getFillWarehouses(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillPolicyWarehouses":
          filter &&
            (await dispatch(
              fnFill.getFillPolicyWarehouses(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillWarehousesDestine":
          filter &&
            (await dispatch(
              fnFill.getFillWarehousesDestine(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillExchanges":
          await dispatch(
            fnFill.getFillExchanges(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillCreditTerms":
          await dispatch(
            fnFill.getFillCreditTerms(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillPaymentMethods":
          await dispatch(
            fnFill.getFillPaymentMethods(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected
            )
          );
          break;
        case "fillAccountClasses":
          await dispatch(
            fnFill.getFillAccountClasses(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountSubClasses":
          filter &&
            (await dispatch(
              fnFill.getFillAccountSubClasses(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillMultiUoms":
          filter &&
            (await dispatch(
              fnFill.getFillMultiUoms(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillReasons":
          filter &&
            (await dispatch(
              fnFill.getFillReasons(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillAccounts":
          await dispatch(
            fnFill.getFillAccounts(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsStock":
          await dispatch(
            fnFill.getFillAccountsStock(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsHpp":
          await dispatch(
            fnFill.getFillAccountsHpp(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsSales":
          await dispatch(
            fnFill.getFillAccountsSales(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsSalesReturn":
          await dispatch(
            fnFill.getFillAccountsSalesReturn(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsSalesDisc":
          await dispatch(
            fnFill.getFillAccountsSalesDisc(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsVatIn":
          await dispatch(
            fnFill.getFillAccountsVatIn(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsVatOut":
          await dispatch(
            fnFill.getFillAccountsVatOut(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsCashAndBank":
          await dispatch(
            fnFill.getFillAccountsCashAndBank(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsFullBank":
          await dispatch(
            fnFill.getFillAccountsFullBank(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsCorrection":
          await dispatch(
            fnFill.getFillAccountsCorrection(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsUsed":
          await dispatch(
            fnFill.getFillAccountsUsed(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsCashIn":
          await dispatch(
            fnFill.getFillAccountsCashIn(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsPerawatan":
          await dispatch(
            fnFill.getFillAccountsPerawatan(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsCashOut":
          await dispatch(
            fnFill.getFillAccountsCashOut(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsPurchaseCost":
          await dispatch(
            fnFill.getFillAccountsPurchaseCost(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsAsset":
          await dispatch(
            fnFill.getFillAccountsAsset(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsAccumulate":
          await dispatch(
            fnFill.getFillAccountsAccumulate(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsAssetSales":
          await dispatch(
            fnFill.getFillAccountsAssetSales(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAccountsAssetExpense":
          await dispatch(
            fnFill.getFillAccountsAssetExpense(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillCustomers":
          await dispatch(
            fnFill.getFillCustomers(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillCustomerCategories":
          await dispatch(
            fnFill.getFillCustomerCategories(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillSupplierCategories":
          await dispatch(
            fnFill.getFillSupplierCategories(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillSuppliers":
          await dispatch(
            fnFill.getFillSuppliers(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillPrices":
          await dispatch(
            fnFill.getFillPrices(query, page, PER_PAGE_LOAD, dataSelected)
          );
          break;
        case "fillCountries":
          await dispatch(
            fnFillPublic.getFillCountries(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillProvinces":
          filter &&
            (await dispatch(
              fnFillPublic.getFillProvinces(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillCities":
          filter &&
            (await dispatch(
              fnFillPublic.getFillCities(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillCitiesComplete":
          await dispatch(
            fnFillPublic.getFillCitiesComplete(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillDistricts":
          filter &&
            (await dispatch(
              fnFillPublic.getFillDistricts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillSubDistricts":
          filter &&
            (await dispatch(
              fnFillPublic.getFillSubDistricts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                name,
                filter
              )
            ));
          break;
        case "fillProfessions":
          await dispatch(
            fnFillPublic.getFillProfessions(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillNumberOfEmployees":
          await dispatch(
            fnFillPublic.getFillNumberOfEmployees(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillBusinessTypes":
          await dispatch(
            fnFillPublic.getFillBusinessTypes(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillIndustries":
          await dispatch(
            fnFillPublic.getFillIndustries(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillPublicExchanges":
          await dispatch(
            fnFillPublic.getFillPublicExchanges(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillSalesProducts":
          filter &&
            (await dispatch(
              fnFill.getFillSalesProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillBillingProducts":
          filter &&
            (await dispatch(
              fnFill.getFillBillingProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillPurchaseProducts":
          filter &&
            (await dispatch(
              fnFill.getFillPurchaseProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillAssemblyProducts":
          filter &&
            (await dispatch(
              fnFill.getFillAssemblyProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillDisassemblyProducts":
          filter &&
            (await dispatch(
              fnFill.getFillDisassemblyProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillTransferProducts":
          filter &&
            (await dispatch(
              fnFill.getFillTransferProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillRevaluationProducts":
          filter &&
            (await dispatch(
              fnFill.getFillRevaluationProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillAdjustmentProducts":
          filter &&
            (await dispatch(
              fnFill.getFillAdjustmentProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillFormulaProducts":
          filter &&
            (await dispatch(
              fnFill.getFillFormulaProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillComponentProducts":
          filter &&
            (await dispatch(
              fnFill.getFillComponentProducts(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillStaffs":
          await dispatch(
            fnFill.getFillStaffs(query, page, PER_PAGE_LOAD, dataSelected, name)
          );
          break;
        case "fillGraders":
          await dispatch(
            fnFill.getFillGraders(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillListTrans":
          await dispatch(
            fnFill.getFillListTrans(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillListOrders":
          filter &&
            (await dispatch(
              fnFill.getFillListOrders(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillDepreciationMethods":
          await dispatch(
            fnFill.getFillDepreciationMethods(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAssetCategories":
          await dispatch(
            fnFill.getFillAssetCategories(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillAssets":
          await dispatch(
            fnFill.getFillAssets(query, page, PER_PAGE_LOAD, dataSelected, name)
          );
          break;
        case "fillAssetComponents":
          filter &&
            (await dispatch(
              fnFill.getFillAssetComponents(
                query,
                page,
                PER_PAGE_LOAD,
                dataSelected,
                filter
              )
            ));
          break;
        case "fillUserCategories":
          await dispatch(
            fnFill.getFillUserCategories(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        case "fillUserPolicies":
          await dispatch(
            fnFill.getFillUserPolicies(
              query,
              page,
              PER_PAGE_LOAD,
              dataSelected,
              name
            )
          );
          break;
        default:
          break;
      }
      if (!active) {
        return;
      }
      setIsLoading(false);
    })();
  }, [query, page, fnGetFill, dataSelected, dispatch, name, filter]);

  useEffect(() => {
    switch (fnGetFill) {
      case "fillProducts":
        if (
          fillData.errorFillProducts !== false &&
          fillData.errorFillProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillProducts.count);
          setOptions(fillData.getFillProducts.data);
        }
        break;
      case "fillProductCategories":
        if (
          fillData.errorFillProductCategories !== false &&
          fillData.errorFillProductCategories !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillProductCategories.count);
          setOptions(fillData.getFillProductCategories.data);
        }
        break;
      case "fillProductTypes":
        if (
          fillData.errorFillProductTypes !== false &&
          fillData.errorFillProductTypes !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillProductTypes.count);
          setOptions(fillData.getFillProductTypes.data);
        }
        break;
      case "fillProductUoms":
        if (
          fillData.errorFillProductUoms !== false &&
          fillData.errorFillProductUoms !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillProductUoms.count);
          setOptions(fillData.getFillProductUoms.data);
        }
        break;
      case "fillProductGroups":
        if (
          fillData.errorFillProductGroups !== false &&
          fillData.errorFillProductGroups !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillProductGroups.count);
          setOptions(fillData.getFillProductGroups.data);
        }
        break;
      case "fillBrands":
        if (
          fillData.errorFillBrands !== false &&
          fillData.errorFillBrands !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillBrands.count);
          setOptions(fillData.getFillBrands.data);
        }
        break;
      case "fillRacks":
        if (
          fillData.errorFillRacks !== false &&
          fillData.errorFillRacks !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillRacks.count);
          setOptions(fillData.getFillRacks.data);
        }
        break;
      case "fillTaxes":
        if (
          fillData.errorFillTaxes !== false &&
          fillData.errorFillTaxes !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillTaxes.count);
          setOptions(fillData.getFillTaxes.data);
        }
        break;
      case "fillStores":
        if (
          fillData.errorFillStores !== false &&
          fillData.errorFillStores !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillStores.count);
          setOptions(fillData.getFillStores.data);
        }
        break;
      case "fillStoresDestine":
        if (
          fillData.errorFillStoresDestine !== false &&
          fillData.errorFillStoresDestine !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillStoresDestine.count);
          setOptions(fillData.getFillStoresDestine.data);
        }
        break;
      case "fillWarehouses":
        if (
          fillData.errorFillWarehouses !== false &&
          fillData.errorFillWarehouses !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillWarehouses.count);
          setOptions(fillData.getFillWarehouses.data);
        }
        break;
      case "fillPolicyWarehouses":
        if (
          fillData.errorFillPolicyWarehouses !== false &&
          fillData.errorFillPolicyWarehouses !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillPolicyWarehouses.count);
          setOptions(fillData.getFillPolicyWarehouses.data);
        }
        break;
      case "fillWarehousesDestine":
        if (
          fillData.errorFillWarehousesDestine !== false &&
          fillData.errorFillWarehousesDestine !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillWarehousesDestine.count);
          setOptions(fillData.getFillWarehousesDestine.data);
        }
        break;
      case "fillExchanges":
        if (
          fillData.errorFillExchanges !== false &&
          fillData.errorFillExchanges !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillExchanges.count);
          setOptions(fillData.getFillExchanges.data);
        }
        break;
      case "fillCreditTerms":
        if (
          fillData.errorFillCreditTerms !== false &&
          fillData.errorFillCreditTerms !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillCreditTerms.count);
          setOptions(fillData.getFillCreditTerms.data);
        }
        break;
      case "fillPaymentMethods":
        if (
          fillData.errorFillPaymentMethods !== false &&
          fillData.errorFillPaymentMethods !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillPaymentMethods.count);
          setOptions(fillData.getFillPaymentMethods.data);
        }
        break;
      case "fillAccountClasses":
        if (
          fillData.errorFillAccountClasses !== false &&
          fillData.errorFillAccountClasses !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountClasses.count);
          setOptions(fillData.getFillAccountClasses.data);
        }
        break;
      case "fillAccountSubClasses":
        if (
          fillData.errorFillAccountSubClasses !== false &&
          fillData.errorFillAccountSubClasses !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
          setOptions([]);
        } else {
          setCount(fillData.getFillAccountSubClasses.count);
          setOptions(fillData.getFillAccountSubClasses.data);
        }
        break;
      case "fillAccounts":
        if (
          fillData.errorFillAccounts !== false &&
          fillData.errorFillAccounts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccounts.count);
          setOptions(fillData.getFillAccounts.data);
        }
        break;
      case "fillAccountsStock":
        if (
          fillData.errorFillAccountsStock !== false &&
          fillData.errorFillAccountsStock !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsStock.count);
          setOptions(fillData.getFillAccountsStock.data);
        }
        break;
      case "fillAccountsHpp":
        if (
          fillData.errorFillAccountsHpp !== false &&
          fillData.errorFillAccountsHpp !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsHpp.count);
          setOptions(fillData.getFillAccountsHpp.data);
        }
        break;
      case "fillAccountsSales":
        if (
          fillData.errorFillAccountsSales !== false &&
          fillData.errorFillAccountsSales !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsSales.count);
          setOptions(fillData.getFillAccountsSales.data);
        }
        break;
      case "fillAccountsSalesReturn":
        if (
          fillData.errorFillAccountsSalesReturn !== false &&
          fillData.errorFillAccountsSalesReturn !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsSalesReturn.count);
          setOptions(fillData.getFillAccountsSalesReturn.data);
        }
        break;
      case "fillAccountsSalesDisc":
        if (
          fillData.errorFillAccountsSalesDisc !== false &&
          fillData.errorFillAccountsSalesDisc !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsSalesDisc.count);
          setOptions(fillData.getFillAccountsSalesDisc.data);
        }
        break;
      case "fillAccountsVatIn":
        if (
          fillData.errorFillAccountsVatIn !== false &&
          fillData.errorFillAccountsVatIn !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsVatIn.count);
          setOptions(fillData.getFillAccountsVatIn.data);
        }
        break;
      case "fillAccountsVatOut":
        if (
          fillData.errorFillAccountsVatOut !== false &&
          fillData.errorFillAccountsVatOut !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsVatOut.count);
          setOptions(fillData.getFillAccountsVatOut.data);
        }
        break;
      case "fillAccountsCashAndBank":
        if (
          fillData.errorFillAccountsCashAndBank !== false &&
          fillData.errorFillAccountsCashAndBank !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsCashAndBank.count);
          setOptions(fillData.getFillAccountsCashAndBank.data);
        }
        break;
      case "fillAccountsFullBank":
        if (
          fillData.errorFillAccountsFullBank !== false &&
          fillData.errorFillAccountsFullBank !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsFullBank.count);
          setOptions(fillData.getFillAccountsFullBank.data);
        }
        break;
      case "fillAccountsCorrection":
        if (
          fillData.errorFillAccountsCorrection !== false &&
          fillData.errorFillAccountsCorrection !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsCorrection.count);
          setOptions(fillData.getFillAccountsCorrection.data);
        }
        break;
      case "fillAccountsUsed":
        if (
          fillData.errorFillAccountsUsed !== false &&
          fillData.errorFillAccountsUsed !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsUsed.count);
          setOptions(fillData.getFillAccountsUsed.data);
        }
        break;
      case "fillAccountsCashIn":
        if (
          fillData.errorFillAccountsCashIn !== false &&
          fillData.errorFillAccountsCashIn !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsCashIn.count);
          setOptions(fillData.getFillAccountsCashIn.data);
        }
        break;
      case "fillAccountsPerawatan":
        if (
          fillData.errorFillAccountsPerawatan !== false &&
          fillData.errorFillAccountsPerawatan !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsPerawatan.count);
          setOptions(fillData.getFillAccountsPerawatan.data);
        }
        break;
      case "fillAccountsCashOut":
        if (
          fillData.errorFillAccountsCashOut !== false &&
          fillData.errorFillAccountsCashOut !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsCashOut.count);
          setOptions(fillData.getFillAccountsCashOut.data);
        }
        break;
      case "fillAccountsPurchaseCost":
        if (
          fillData.errorFillAccountsPurchaseCost !== false &&
          fillData.errorFillAccountsPurchaseCost !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsPurchaseCost.count);
          setOptions(fillData.getFillAccountsPurchaseCost.data);
        }
        break;
      case "fillAccountsAsset":
        if (
          fillData.errorFillAccountsAsset !== false &&
          fillData.errorFillAccountsAsset !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsAsset.count);
          setOptions(fillData.getFillAccountsAsset.data);
        }
        break;
      case "fillAccountsAccumulate":
        if (
          fillData.errorFillAccountsAccumulate !== false &&
          fillData.errorFillAccountsAccumulate !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsAccumulate.count);
          setOptions(fillData.getFillAccountsAccumulate.data);
        }
        break;
      case "fillAccountsAssetSales":
        if (
          fillData.errorFillAccountsAssetSales !== false &&
          fillData.errorFillAccountsAssetSales !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsAssetSales.count);
          setOptions(fillData.getFillAccountsAssetSales.data);
        }
        break;
      case "fillAccountsAssetExpense":
        if (
          fillData.errorFillAccountsAssetExpense !== false &&
          fillData.errorFillAccountsAssetExpense !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAccountsAssetExpense.count);
          setOptions(fillData.getFillAccountsAssetExpense.data);
        }
        break;
      case "fillCustomers":
        if (
          fillData.errorFillCustomers !== false &&
          fillData.errorFillCustomers !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillCustomers.count);
          setOptions(fillData.getFillCustomers.data);
        }
        break;
      case "fillCustomerCategories":
        if (
          fillData.errorFillCustomerCategories !== false &&
          fillData.errorFillCustomerCategories !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillCustomerCategories.count);
          setOptions(fillData.getFillCustomerCategories.data);
        }
        break;
      case "fillSuppliers":
        if (
          fillData.errorFillSuppliers !== false &&
          fillData.errorFillSuppliers !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillSuppliers.count);
          setOptions(fillData.getFillSuppliers.data);
        }
        break;
      case "fillSupplierCategories":
        if (
          fillData.errorFillSupplierCategories !== false &&
          fillData.errorFillSupplierCategories !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillSupplierCategories.count);
          setOptions(fillData.getFillSupplierCategories.data);
        }
        break;
      case "fillPrices":
        if (
          fillData.errorFillPrices !== false &&
          fillData.errorFillPrices !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillPrices.count);
          setOptions(fillData.getFillPrices.data);
        }
        break;
      case "fillCountries":
        if (
          publics.errorFillCountries !== false &&
          publics.errorFillCountries !== true
        ) {
          setCount(0);
        } else {
          setCount(publics.getFillCountries.count);
          setOptions(publics.getFillCountries.data);
        }
        break;
      case "fillProvinces":
        if (
          publics.errorFillProvinces !== false &&
          publics.errorFillProvinces !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
          setOptions([]);
        } else {
          setCount(publics.getFillProvinces.count);
          setOptions(publics.getFillProvinces.data);
        }
        break;
      case "fillCities":
        if (
          publics.errorFillCities !== false &&
          publics.errorFillCities !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
          setOptions([]);
        } else {
          setCount(publics.getFillCities.count);
          setOptions(publics.getFillCities.data);
        }
        break;
      case "fillCitiesComplete":
        if (
          publics.errorFillCitiesComplete !== false &&
          publics.errorFillCitiesComplete !== true
        ) {
          setCount(0);
          // setOptions([]);
        } else {
          setCount(publics.getFillCitiesComplete.count);
          setOptions(publics.getFillCitiesComplete.data);
        }
        break;
      case "fillDistricts":
        if (
          publics.errorFillDistricts !== false &&
          publics.errorFillDistricts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
          setOptions([]);
        } else {
          setCount(publics.getFillDistricts.count);
          setOptions(publics.getFillDistricts.data);
        }
        break;
      case "fillSubDistricts":
        if (
          publics.errorFillSubDistricts !== false &&
          publics.errorFillSubDistricts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
          setOptions([]);
        } else {
          setCount(publics.getFillSubDistricts.count);
          setOptions(publics.getFillSubDistricts.data);
        }
        break;
      case "fillProfessions":
        if (
          publics.errorFillProfessions !== false &&
          publics.errorFillProfessions !== true
        ) {
          setCount(0);
        } else {
          setCount(publics.getFillProfessions.count);
          setOptions(publics.getFillProfessions.data);
        }
        break;
      case "fillNumberOfEmployees":
        if (
          publics.errorFillNumberOfEmployees !== false &&
          publics.errorFillNumberOfEmployees !== true
        ) {
          setCount(0);
        } else {
          setCount(publics.getFillNumberOfEmployees.count);
          setOptions(publics.getFillNumberOfEmployees.data);
        }
        break;
      case "fillBusinessTypes":
        if (
          publics.errorFillBusinessTypes !== false &&
          publics.errorFillBusinessTypes !== true
        ) {
          setCount(0);
        } else {
          setCount(publics.getFillBusinessTypes.count);
          setOptions(publics.getFillBusinessTypes.data);
        }
        break;
      case "fillIndustries":
        if (
          publics.errorFillIndustries !== false &&
          publics.errorFillIndustries !== true
        ) {
          setCount(0);
        } else {
          setCount(publics.getFillIndustries.count);
          setOptions(publics.getFillIndustries.data);
        }
        break;
      case "fillPublicExchanges":
        if (
          publics.errorFillPublicExchanges !== false &&
          publics.errorFillPublicExchanges !== true
        ) {
          setCount(0);
        } else {
          setCount(publics.getFillPublicExchanges.count);
          setOptions(publics.getFillPublicExchanges.data);
        }
        break;
      case "fillSalesProducts":
        if (
          fillData.errorFillSalesProducts !== false &&
          fillData.errorFillSalesProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillSalesProducts.count);
          setOptions(fillData.getFillSalesProducts.data);
        }
        break;
      case "fillBillingProducts":
        if (
          fillData.errorFillBillingProducts !== false &&
          fillData.errorFillBillingProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillBillingProducts.count);
          setOptions(fillData.getFillBillingProducts.data);
        }
        break;
      case "fillPurchaseProducts":
        if (
          fillData.errorFillPurchaseProducts !== false &&
          fillData.errorFillPurchaseProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillPurchaseProducts.count);
          setOptions(fillData.getFillPurchaseProducts.data);
        }
        break;
      case "fillAssemblyProducts":
        if (
          fillData.errorFillAssemblyProducts !== false &&
          fillData.errorFillAssemblyProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAssemblyProducts.count);
          setOptions(fillData.getFillAssemblyProducts.data);
        }
        break;
      case "fillDisassemblyProducts":
        if (
          fillData.errorFillDisassemblyProducts !== false &&
          fillData.errorFillDisassemblyProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillDisassemblyProducts.count);
          setOptions(fillData.getFillDisassemblyProducts.data);
        }
        break;
      case "fillTransferProducts":
        if (
          fillData.errorFillTransferProducts !== false &&
          fillData.errorFillTransferProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillTransferProducts.count);
          setOptions(fillData.getFillTransferProducts.data);
        }
        break;
      case "fillRevaluationProducts":
        if (
          fillData.errorFillRevaluationProducts !== false &&
          fillData.errorFillRevaluationProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillRevaluationProducts.count);
          setOptions(fillData.getFillRevaluationProducts.data);
        }
        break;
      case "fillAdjustmentProducts":
        if (
          fillData.errorFillAdjustmentProducts !== false &&
          fillData.errorFillAdjustmentProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAdjustmentProducts.count);
          setOptions(fillData.getFillAdjustmentProducts.data);
        }
        break;
      case "fillFormulaProducts":
        if (
          fillData.errorFillFormulaProducts !== false &&
          fillData.errorFillFormulaProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillFormulaProducts.count);
          setOptions(fillData.getFillFormulaProducts.data);
        }
        break;
      case "fillComponentProducts":
        if (
          fillData.errorFillComponentProducts !== false &&
          fillData.errorFillComponentProducts !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillComponentProducts.count);
          setOptions(fillData.getFillComponentProducts.data);
        }
        break;
      case "fillStaffs":
        if (
          fillData.errorFillStaffs !== false &&
          fillData.errorFillStaffs !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillStaffs.count);
          setOptions(fillData.getFillStaffs.data);
        }
        break;
      case "fillGraders":
        if (
          fillData.errorFillGraders !== false &&
          fillData.errorFillGraders !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillGraders.count);
          setOptions(fillData.getFillGraders.data);
        }
        break;
      case "fillListTrans":
        if (
          fillData.errorFillListTrans !== false &&
          fillData.errorFillListTrans !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillListTrans.count);
          setOptions(fillData.getFillListTrans.data);
        }
        break;
      case "fillListOrders":
        if (
          fillData.errorFillListOrders !== false &&
          fillData.errorFillListOrders !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillListOrders.count);
          setOptions(fillData.getFillListOrders.data);
        }
        break;
      case "fillMultiUoms":
        if (
          fillData.errorFillMultiUoms !== false &&
          fillData.errorFillMultiUoms !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillMultiUoms.count);
          setOptions(fillData.getFillMultiUoms.data);
        }
        break;
      case "fillReasons":
        if (
          fillData.errorFillReasons !== false &&
          fillData.errorFillReasons !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillReasons.count);
          setOptions(fillData.getFillReasons.data);
        }
        break;
      case "fillDepreciationMethods":
        if (
          fillData.errorFillDepreciationMethods !== false &&
          fillData.errorFillDepreciationMethods !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillDepreciationMethods.count);
          setOptions(fillData.getFillDepreciationMethods.data);
        }
        break;
      case "fillAssetCategories":
        if (
          fillData.errorFillAssetCategories !== false &&
          fillData.errorFillAssetCategories !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAssetCategories.count);
          setOptions(fillData.getFillAssetCategories.data);
        }
        break;
      case "fillAssets":
        if (
          fillData.errorFillAssets !== false &&
          fillData.errorFillAssets !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillAssets.count);
          setOptions(fillData.getFillAssets.data);
        }
        break;
      case "fillAssetComponents":
        if (
          fillData.errorFillAssetComponents !== false &&
          fillData.errorFillAssetComponents !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
          setOptions([]);
        } else {
          setCount(fillData.getFillAssetComponents.count);
          setOptions(fillData.getFillAssetComponents.data);
        }
        break;
      case "fillUserCategories":
        if (
          fillData.errorFillUserCategories !== false &&
          fillData.errorFillUserCategories !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillUserCategories.count);
          setOptions(fillData.getFillUserCategories.data);
        }
        break;
      case "fillUserPolicies":
        if (
          fillData.errorFillUserPolicies !== false &&
          fillData.errorFillUserPolicies !== true
        ) {
          setCount(0);
          if (filter !== false) setOptions([]);
        } else {
          setCount(fillData.getFillUserPolicies.count);
          setOptions(fillData.getFillUserPolicies.data);
        }
        break;

      default:
        break;
    }
  }, [fillData, fnGetFill, filter, publics]);

  useEffect(() => {
    if (!options) {
      setOptions([]);
    }
  }, [options]);

  if (!didMount) {
    return null;
  }

  if (options === undefined) {
    return null;
  }

  return (
    !hide && (
      <Controller
        name={name}
        control={control}
        defaultValue={
          dataSelected
            ? dataSelected.id
              ? dataSelected.id
              : secName === "unitMulti"
              ? dataSelected.unitMulti
              : ""
            : ""
        }
        rules={rules || ""}
        render={(props) => (
          <Autocomplete
            ref={ref}
            id={name}
            // value={dataSelected || null}
            value={
              (options?.data?.some((item) => dataSelected.id !== item.id)
                ? options[0]
                : dataSelected) || null
            }
            // PopperComponent={PopperMy}
            disableClearable={disableClearable || false}
            ListboxComponent={ListboxComponent}
            options={options || []}
            loading={isLoading}
            getOptionLabel={(option) =>
              option.Alias
                ? `${option.Description} - ${option.Alias}`
                : option.Description || ""
            }
            onChange={onChange}
            isOptionEqualToValue={(option, value) =>
              (option.id
                ? option.id
                : option[secName]
                ? option[secName]
                : true) ===
              (value.id ? value.id : value[secName] ? value[secName] : false)
            }
            disabled={disabled || false}
            renderInput={(params) => (
              <TextField
                {...params}
                id={nameSearch}
                name={nameSearch}
                label={label}
                fullWidth
                // variant="outlined"
                size="small"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setDirect("up");
                  setPage(0);
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      <React.Fragment>
                        {isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                        {btnSearch}
                      </React.Fragment>
                    </>
                  ),
                }}
                inputRef={inputRef}
                error={errors ? true : false}
                helperText={errors && "This field is required"}
                onKeyUp={onKeyUp}
                required={required || false}
                // {...other}
              />
            )}
          />
        )}
      />
    )
  );
});
Autocompletes.displayName = "Autocompletes";
export default connect()(React.memo(Autocompletes));
