package com.ozius.internship.project.service.filtering;

import com.ozius.internship.project.dto.ProductDTO;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.service.filtering.transformers.ModelMapperBasedResultTransformer;
import com.ozius.internship.project.service.filtering.builders.PagingJpaQueryBuilder;
import com.ozius.internship.project.service.filtering.transformers.ResultTransformer;
import com.ozius.internship.project.service.filtering.filter.FilterSpecs;
import com.ozius.internship.project.service.filtering.sort.SortSpecs;
import jakarta.persistence.EntityManager;
import org.modelmapper.ModelMapper;

import static org.apache.commons.lang3.ObjectUtils.isNotEmpty;

public class ProductPaginationSearchQuery extends PagingJpaQueryBuilder<Product,ProductDTO> {

    private final ModelMapper modelMapper;

    public ProductPaginationSearchQuery(ModelMapper modelMapper, EntityManager em) {
        super("select p from Product p ", em, Product.class);
        this.modelMapper = modelMapper;

        mapCriteriaToPropertyPath("productName", "p.name");
        mapCriteriaToPropertyPath("categoryName", "p.category.name");
        mapCriteriaToPropertyPath("cityName", "p.seller.legalAddress.city");
        mapCriteriaToPropertyPath("productPrice", "p.price");
        mapCriteriaToPropertyPath("priceFrom", "p.price");
        mapCriteriaToPropertyPath("priceTo", "p.price");
        mapCriteriaToPropertyPath("sellerAlias", "p.seller.alias");
    }

    @Override
    public String orderByDefault() {
        return "p.id";
    }

    @Override
    public ResultTransformer<Product, ProductDTO> getTransformer() {
        return new ModelMapperBasedResultTransformer<>(modelMapper, ProductDTO.class);
    }

    public ProductPaginationSearchQuery orderBy(SortSpecs sortSpecs) {
        if(isNotEmpty(sortSpecs)) {
            applySortSpecs(sortSpecs);
        }
        return this;
    }

    public ProductPaginationSearchQuery filterBy(FilterSpecs filterSpecs) {
        if(isNotEmpty(filterSpecs)) {
            applyFilterSpecs(filterSpecs);
        }
        return this;
    }

}
