import { createSlice } from '@reduxjs/toolkit';
import { getCategories, addArticle, getPaginateArticles, changeStatusArticle, homeLoadMore, getArticle } from '../actions/articles';

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        homeSort: {
            sortby: "_id",
            order: "desc",
            limit: 3,
            skip: 0
        },
        loading: false,
        articles: [],
        current: null,
        categories: []
    },
    reducers: {
        updateCategories: (state, action) => {
            state.categories = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            //Add article
            .addCase(addArticle.pending, (state, action) => { state.loading = true; })
            .addCase(addArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.lastAdded = action.payload;
            })
            .addCase(addArticle.rejected, (state, action) => { state.loading = false; })

            //Get paginate articles
            .addCase(getPaginateArticles.pending, (state, action) => { state.loading = true; })
            .addCase(getPaginateArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.adminArticles = action.payload;
            })
            .addCase(getPaginateArticles.rejected, (state, action) => { state.loading = false; })

            //Home load more
            .addCase(homeLoadMore.fulfilled, (state, action) => {
                state.homeSort.skip = action.payload.sort.skip;
                state.articles = action.payload.newState;
            })

            //Change status article
            .addCase(changeStatusArticle.fulfilled, (state, action) => {
                state.adminArticles.docs = action.payload;
            })

            //Get article
            .addCase(getArticle.pending, (state) => { state.loading = true; })
            .addCase(getArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload
            })
            .addCase(getArticle.rejected, (state, action) => { state.loading = false; })

            //Get categories
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
    }
});

export const { updateCategories } = articlesSlice.actions;
export default articlesSlice.reducer;