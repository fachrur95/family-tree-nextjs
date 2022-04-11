// /* eslint-disable */
import React, { forwardRef, useEffect, useState } from 'react'
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import { ButtonGroup, Slide } from '@mui/material';
import { Controller } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import { connect, useDispatch, useSelector } from "react-redux";
import Controls from './Controls';
import * as fnFill from "../../configs/_redux/actions/fillAutocompleteActions";

const PER_PAGE_LOAD = 50;

const Autocompletes = (props) => {
    const { control, name, nameSearch, label, fnGetFill, onChange, dataSelected, clearable, secName, disabled, inputRef, btnSearch, filter, autoFill } = props;
    const [didMount, setDidMount] = useState(false);
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [direct, setDirect] = useState('left');

    const dispatch = useDispatch();
    const fillData = useSelector((state) => state.fillData);

    const loadPrevData = () => {
        setDirect('right');
        setPage(page - 1);
    };

    const loadNextData = () => {
        setDirect('left');
        setPage(page + 1);
    };

    const ListboxComponent = forwardRef(function ListboxComponentInner(
        props,
        ref
    ) {
        return (
            <Slide direction={direct} in={!isLoading} mountOnEnter unmountOnExit>
                <ul
                    ref={ref}
                    id={props.id}
                    className={props.className}
                    onMouseDown={props.onMouseDown}
                    role={props.role}
                >
                    {props.children}
                    {count > PER_PAGE_LOAD && <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group" fullWidth>
                        <Controls.Button size="small" text="Prev" onClick={loadPrevData} disabled={(page === 0) || isLoading} />
                        <Controls.Button size="small" text="Next" onClick={loadNextData} disabled={(!(count - (page * PER_PAGE_LOAD) >= PER_PAGE_LOAD)) || isLoading} />
                    </ButtonGroup>}
                </ul>
            </Slide>
        );
    });

    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, []);

    useEffect(() => {
        let active = true;
        (async () => {
            setIsLoading(true);
            switch (fnGetFill) {
                case 'fillProducts':
                    await dispatch(fnFill.getFillProducts(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillProductCategories':
                    await dispatch(fnFill.getFillProductCategories(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillProductTypes':
                    await dispatch(fnFill.getFillProductTypes(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillProductUoms':
                    await dispatch(fnFill.getFillProductUoms(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillProductGroups':
                    await dispatch(fnFill.getFillProductGroups(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillBrands':
                    await dispatch(fnFill.getFillBrands(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillRacks':
                    await dispatch(fnFill.getFillRacks(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillTaxes':
                    await dispatch(fnFill.getFillTaxes(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillStores':
                    await dispatch(fnFill.getFillStores(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillWarehouses':
                    await dispatch(fnFill.getFillWarehouses(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillExchanges':
                    await dispatch(fnFill.getFillExchanges(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillCreditTerms':
                    await dispatch(fnFill.getFillCreditTerms(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillPaymentMethods':
                    await dispatch(fnFill.getFillPaymentMethods(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillAccountClasses':
                    await dispatch(fnFill.getFillAccountClasses(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountSubClasses':
                    await dispatch(fnFill.getFillAccountSubClasses(query, page, PER_PAGE_LOAD, dataSelected, name, filter));
                    break;
                case 'fillAccounts':
                    await dispatch(fnFill.getFillAccounts(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsStock':
                    await dispatch(fnFill.getFillAccountsStock(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsHpp':
                    await dispatch(fnFill.getFillAccountsHpp(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsSales':
                    await dispatch(fnFill.getFillAccountsSales(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsSalesReturn':
                    await dispatch(fnFill.getFillAccountsSalesReturn(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsSalesDisc':
                    await dispatch(fnFill.getFillAccountsSalesDisc(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsVatIn':
                    await dispatch(fnFill.getFillAccountsVatIn(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsVatOut':
                    await dispatch(fnFill.getFillAccountsVatOut(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsCashAndBank':
                    await dispatch(fnFill.getFillAccountsCashAndBank(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsCorrection':
                    await dispatch(fnFill.getFillAccountsCorrection(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsCashIn':
                    await dispatch(fnFill.getFillAccountsCashIn(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsCashOut':
                    await dispatch(fnFill.getFillAccountsCashOut(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillAccountsPurchaseCost':
                    await dispatch(fnFill.getFillAccountsPurchaseCost(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillCustomers':
                    await dispatch(fnFill.getFillCustomers(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillCustomerCategories':
                    await dispatch(fnFill.getFillCustomerCategories(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillSupplierCategories':
                    await dispatch(fnFill.getFillSupplierCategories(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillSuppliers':
                    await dispatch(fnFill.getFillSuppliers(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillPrices':
                    await dispatch(fnFill.getFillPrices(query, page, PER_PAGE_LOAD, dataSelected));
                    break;
                case 'fillCountries':
                    await dispatch(fnFill.getFillCountries(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillProvinces':
                    await dispatch(fnFill.getFillProvinces(query, page, PER_PAGE_LOAD, dataSelected, name, filter));
                    break;
                case 'fillCities':
                    await dispatch(fnFill.getFillCities(query, page, PER_PAGE_LOAD, dataSelected, name, filter));
                    break;
                case 'fillDistricts':
                    await dispatch(fnFill.getFillDistricts(query, page, PER_PAGE_LOAD, dataSelected, name, filter));
                    break;
                case 'fillSubDistricts':
                    await dispatch(fnFill.getFillSubDistricts(query, page, PER_PAGE_LOAD, dataSelected, name, filter));
                    break;
                case 'fillSalesProducts':
                    await dispatch(fnFill.getFillSalesProducts(query, page, PER_PAGE_LOAD, dataSelected, filter));
                    break;
                case 'fillPurchaseProducts':
                    await dispatch(fnFill.getFillPurchaseProducts(query, page, PER_PAGE_LOAD, dataSelected, filter));
                    break;
                case 'fillAssemblyProducts':
                    await dispatch(fnFill.getFillAssemblyProducts(query, page, PER_PAGE_LOAD, dataSelected, filter));
                    break;
                case 'fillDisassemblyProducts':
                    await dispatch(fnFill.getFillDisassemblyProducts(query, page, PER_PAGE_LOAD, dataSelected, filter));
                    break;
                case 'fillTransferProducts':
                    await dispatch(fnFill.getFillTransferProducts(query, page, PER_PAGE_LOAD, dataSelected, filter));
                    break;
                case 'fillRevaluationProducts':
                    await dispatch(fnFill.getFillRevaluationProducts(query, page, PER_PAGE_LOAD, dataSelected, filter));
                    break;
                case 'fillAdjustmentProducts':
                    await dispatch(fnFill.getFillAdjustmentProducts(query, page, PER_PAGE_LOAD, dataSelected, filter));
                    break;
                case 'fillFormulaProducts':
                    await dispatch(fnFill.getFillFormulaProducts(query, page, PER_PAGE_LOAD, dataSelected, filter));
                    break;
                case 'fillComponentProducts':
                    await dispatch(fnFill.getFillComponentProducts(query, page, PER_PAGE_LOAD, dataSelected, filter));
                    break;
                case 'fillStaffs':
                    await dispatch(fnFill.getFillStaffs(query, page, PER_PAGE_LOAD, dataSelected, name));
                    break;
                case 'fillGraders':
                    await dispatch(fnFill.getFillGraders(query, page, PER_PAGE_LOAD, dataSelected, name));
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
            case 'fillProducts':
                if (
                    fillData.errorFillProducts !== false &&
                    fillData.errorFillProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillProducts.count);
                    setOptions(fillData.getFillProducts.data);
                }
                break;
            case 'fillProductCategories':
                if (
                    fillData.errorFillProductCategories !== false &&
                    fillData.errorFillProductCategories !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillProductCategories.count);
                    setOptions(fillData.getFillProductCategories.data);
                }
                break;
            case 'fillProductTypes':
                if (
                    fillData.errorFillProductTypes !== false &&
                    fillData.errorFillProductTypes !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillProductTypes.count);
                    setOptions(fillData.getFillProductTypes.data);
                }
                break;
            case 'fillProductUoms':
                if (
                    fillData.errorFillProductUoms !== false &&
                    fillData.errorFillProductUoms !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillProductUoms.count);
                    setOptions(fillData.getFillProductUoms.data);
                }
                break;
            case 'fillProductGroups':
                if (
                    fillData.errorFillProductGroups !== false &&
                    fillData.errorFillProductGroups !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillProductGroups.count);
                    setOptions(fillData.getFillProductGroups.data);
                }
                break;
            case 'fillBrands':
                if (
                    fillData.errorFillBrands !== false &&
                    fillData.errorFillBrands !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillBrands.count);
                    setOptions(fillData.getFillBrands.data);
                }
                break;
            case 'fillRacks':
                if (
                    fillData.errorFillRacks !== false &&
                    fillData.errorFillRacks !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillRacks.count);
                    setOptions(fillData.getFillRacks.data);
                }
                break;
            case 'fillTaxes':
                if (
                    fillData.errorFillTaxes !== false &&
                    fillData.errorFillTaxes !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillTaxes.count);
                    setOptions(fillData.getFillTaxes.data);
                }
                break;
            case 'fillStores':
                if (
                    fillData.errorFillStores !== false &&
                    fillData.errorFillStores !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillStores.count);
                    setOptions(fillData.getFillStores.data);
                }
                break;
            case 'fillWarehouses':
                if (
                    fillData.errorFillWarehouses !== false &&
                    fillData.errorFillWarehouses !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillWarehouses.count);
                    setOptions(fillData.getFillWarehouses.data);
                }
                break;
            case 'fillExchanges':
                if (
                    fillData.errorFillExchanges !== false &&
                    fillData.errorFillExchanges !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillExchanges.count);
                    setOptions(fillData.getFillExchanges.data);
                }
                break;
            case 'fillCreditTerms':
                if (
                    fillData.errorFillCreditTerms !== false &&
                    fillData.errorFillCreditTerms !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillCreditTerms.count);
                    setOptions(fillData.getFillCreditTerms.data);
                }
                break;
            case 'fillPaymentMethods':
                if (
                    fillData.errorFillPaymentMethods !== false &&
                    fillData.errorFillPaymentMethods !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillPaymentMethods.count);
                    setOptions(fillData.getFillPaymentMethods.data);
                }
                break;
            case 'fillAccountClasses':
                if (
                    fillData.errorFillAccountClasses !== false &&
                    fillData.errorFillAccountClasses !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountClasses.count);
                    setOptions(fillData.getFillAccountClasses.data);
                }
                break;
            case 'fillAccountSubClasses':
                if (
                    fillData.errorFillAccountSubClasses !== false &&
                    fillData.errorFillAccountSubClasses !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountSubClasses.count);
                    setOptions(fillData.getFillAccountSubClasses.data);
                }
                break;
            case 'fillAccounts':
                if (
                    fillData.errorFillAccounts !== false &&
                    fillData.errorFillAccounts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccounts.count);
                    setOptions(fillData.getFillAccounts.data);
                }
                break;
            case 'fillAccountsStock':
                if (
                    fillData.errorFillAccountsStock !== false &&
                    fillData.errorFillAccountsStock !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsStock.count);
                    setOptions(fillData.getFillAccountsStock.data);
                }
                break;
            case 'fillAccountsHpp':
                if (
                    fillData.errorFillAccountsHpp !== false &&
                    fillData.errorFillAccountsHpp !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsHpp.count);
                    setOptions(fillData.getFillAccountsHpp.data);
                }
                break;
            case 'fillAccountsSales':
                if (
                    fillData.errorFillAccountsSales !== false &&
                    fillData.errorFillAccountsSales !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsSales.count);
                    setOptions(fillData.getFillAccountsSales.data);
                }
                break;
            case 'fillAccountsSalesReturn':
                if (
                    fillData.errorFillAccountsSalesReturn !== false &&
                    fillData.errorFillAccountsSalesReturn !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsSalesReturn.count);
                    setOptions(fillData.getFillAccountsSalesReturn.data);
                }
                break;
            case 'fillAccountsSalesDisc':
                if (
                    fillData.errorFillAccountsSalesDisc !== false &&
                    fillData.errorFillAccountsSalesDisc !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsSalesDisc.count);
                    setOptions(fillData.getFillAccountsSalesDisc.data);
                }
                break;
            case 'fillAccountsVatIn':
                if (
                    fillData.errorFillAccountsVatIn !== false &&
                    fillData.errorFillAccountsVatIn !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsVatIn.count);
                    setOptions(fillData.getFillAccountsVatIn.data);
                }
                break;
            case 'fillAccountsVatOut':
                if (
                    fillData.errorFillAccountsVatOut !== false &&
                    fillData.errorFillAccountsVatOut !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsVatOut.count);
                    setOptions(fillData.getFillAccountsVatOut.data);
                }
                break;
            case 'fillAccountsCashAndBank':
                if (
                    fillData.errorFillAccountsCashAndBank !== false &&
                    fillData.errorFillAccountsCashAndBank !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsCashAndBank.count);
                    setOptions(fillData.getFillAccountsCashAndBank.data);
                }
                break;
            case 'fillAccountsCorrection':
                if (
                    fillData.errorFillAccountsCorrection !== false &&
                    fillData.errorFillAccountsCorrection !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsCorrection.count);
                    setOptions(fillData.getFillAccountsCorrection.data);
                }
                break;
            case 'fillAccountsCashIn':
                if (
                    fillData.errorFillAccountsCashIn !== false &&
                    fillData.errorFillAccountsCashIn !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsCashIn.count);
                    setOptions(fillData.getFillAccountsCashIn.data);
                }
                break;
            case 'fillAccountsCashOut':
                if (
                    fillData.errorFillAccountsCashOut !== false &&
                    fillData.errorFillAccountsCashOut !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsCashOut.count);
                    setOptions(fillData.getFillAccountsCashOut.data);
                }
                break;
            case 'fillAccountsPurchaseCost':
                if (
                    fillData.errorFillAccountsPurchaseCost !== false &&
                    fillData.errorFillAccountsPurchaseCost !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAccountsPurchaseCost.count);
                    setOptions(fillData.getFillAccountsPurchaseCost.data);
                }
                break;
            case 'fillCustomers':
                if (
                    fillData.errorFillCustomers !== false &&
                    fillData.errorFillCustomers !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillCustomers.count);
                    setOptions(fillData.getFillCustomers.data);
                }
                break;
            case 'fillCustomerCategories':
                if (
                    fillData.errorFillCustomerCategories !== false &&
                    fillData.errorFillCustomerCategories !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillCustomerCategories.count);
                    setOptions(fillData.getFillCustomerCategories.data);
                }
                break;
            case 'fillSuppliers':
                if (
                    fillData.errorFillSuppliers !== false &&
                    fillData.errorFillSuppliers !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillSuppliers.count);
                    setOptions(fillData.getFillSuppliers.data);
                }
                break;
            case 'fillSupplierCategories':
                if (
                    fillData.errorFillSupplierCategories !== false &&
                    fillData.errorFillSupplierCategories !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillSupplierCategories.count);
                    setOptions(fillData.getFillSupplierCategories.data);
                }
                break;
            case 'fillPrices':
                if (
                    fillData.errorFillPrices !== false &&
                    fillData.errorFillPrices !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillPrices.count);
                    setOptions(fillData.getFillPrices.data);
                }
                break;
            case 'fillCountries':
                if (
                    fillData.errorFillCountries !== false &&
                    fillData.errorFillCountries !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillCountries.count);
                    setOptions(fillData.getFillCountries.data);
                }
                break;
            case 'fillProvinces':
                if (
                    fillData.errorFillProvinces !== false &&
                    fillData.errorFillProvinces !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillProvinces.count);
                    setOptions(fillData.getFillProvinces.data);
                }
                break;
            case 'fillCities':
                if (
                    fillData.errorFillCities !== false &&
                    fillData.errorFillCities !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillCities.count);
                    setOptions(fillData.getFillCities.data);
                }
                break;
            case 'fillDistricts':
                if (
                    fillData.errorFillDistricts !== false &&
                    fillData.errorFillDistricts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillDistricts.count);
                    setOptions(fillData.getFillDistricts.data);
                }
                break;
            case 'fillSubDistricts':
                if (
                    fillData.errorFillSubDistricts !== false &&
                    fillData.errorFillSubDistricts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillSubDistricts.count);
                    setOptions(fillData.getFillSubDistricts.data);
                }
                break;
            case 'fillSalesProducts':
                if (
                    fillData.errorFillSalesProducts !== false &&
                    fillData.errorFillSalesProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillSalesProducts.count);
                    setOptions(fillData.getFillSalesProducts.data);
                }
                break;
            case 'fillPurchaseProducts':
                if (
                    fillData.errorFillPurchaseProducts !== false &&
                    fillData.errorFillPurchaseProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillPurchaseProducts.count);
                    setOptions(fillData.getFillPurchaseProducts.data);
                }
                break;
            case 'fillAssemblyProducts':
                if (
                    fillData.errorFillAssemblyProducts !== false &&
                    fillData.errorFillAssemblyProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAssemblyProducts.count);
                    setOptions(fillData.getFillAssemblyProducts.data);
                }
                break;
            case 'fillDisassemblyProducts':
                if (
                    fillData.errorFillDisassemblyProducts !== false &&
                    fillData.errorFillDisassemblyProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillDisassemblyProducts.count);
                    setOptions(fillData.getFillDisassemblyProducts.data);
                }
                break;
            case 'fillTransferProducts':
                if (
                    fillData.errorFillTransferProducts !== false &&
                    fillData.errorFillTransferProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillTransferProducts.count);
                    setOptions(fillData.getFillTransferProducts.data);
                }
                break;
            case 'fillRevaluationProducts':
                if (
                    fillData.errorFillRevaluationProducts !== false &&
                    fillData.errorFillRevaluationProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillRevaluationProducts.count);
                    setOptions(fillData.getFillRevaluationProducts.data);
                }
                break;
            case 'fillAdjustmentProducts':
                if (
                    fillData.errorFillAdjustmentProducts !== false &&
                    fillData.errorFillAdjustmentProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillAdjustmentProducts.count);
                    setOptions(fillData.getFillAdjustmentProducts.data);
                }
                break;
            case 'fillFormulaProducts':
                if (
                    fillData.errorFillFormulaProducts !== false &&
                    fillData.errorFillFormulaProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillFormulaProducts.count);
                    setOptions(fillData.getFillFormulaProducts.data);
                }
                break;
            case 'fillComponentProducts':
                if (
                    fillData.errorFillComponentProducts !== false &&
                    fillData.errorFillComponentProducts !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillComponentProducts.count);
                    setOptions(fillData.getFillComponentProducts.data);
                }
                break;
            case 'fillStaffs':
                if (
                    fillData.errorFillStaffs !== false &&
                    fillData.errorFillStaffs !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillStaffs.count);
                    setOptions(fillData.getFillStaffs.data);
                }
                break;
            case 'fillGraders':
                if (
                    fillData.errorFillGraders !== false &&
                    fillData.errorFillGraders !== true
                ) {
                    setCount(0);
                } else {
                    setCount(fillData.getFillGraders.count);
                    setOptions(fillData.getFillGraders.data);
                }
                break;

            default:
                break;
        }
    }, [fillData, fnGetFill])

    useEffect(() => {
        if (!options) {
            setOptions([])
        }
    }, [options])

    if (!didMount) {
        return null;
    }
    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={dataSelected ? (dataSelected.id ? dataSelected.id : (dataSelected[secName] ? dataSelected[secName] : "")) : autoFill ? (options ? options[0]?.id : "") : ""}
                render={(props) => (
                    <Autocomplete
                        id={name}
                        value={dataSelected || (autoFill ? (options ? options[0] : null) : null)}
                        disableClearable={clearable || false}
                        ListboxComponent={ListboxComponent}
                        options={options || []}
                        loading={isLoading}
                        getOptionLabel={(option) => option.Alias ? `${option.Description} - ${option.Alias}` : option.Description}
                        onChange={onChange}
                        getOptionSelected={(option, value) => {
                            return (option.id ? option.id : (option[secName] ? option[secName] : "")) === (value.id ? value.id : (value[secName] ? value[secName] : ""));
                        }}
                        disabled={disabled || false}
                        renderInput={
                            (params) => {
                                return <TextField
                                    {...params}
                                    id={nameSearch}
                                    name={nameSearch}
                                    label={label}
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setDirect('up');
                                        setPage(0);
                                    }}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                <React.Fragment>
                                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                                {btnSearch}
                                            </>
                                        ),
                                    }}
                                    inputRef={inputRef}
                                />
                            }
                        }
                    />
                )}
            />
        </>
    )
}

export default connect()(Autocompletes);