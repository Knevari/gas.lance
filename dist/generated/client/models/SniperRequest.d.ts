import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type SniperRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$SniperRequestPayload>;
export type AggregateSniperRequest = {
    _count: SniperRequestCountAggregateOutputType | null;
    _avg: SniperRequestAvgAggregateOutputType | null;
    _sum: SniperRequestSumAggregateOutputType | null;
    _min: SniperRequestMinAggregateOutputType | null;
    _max: SniperRequestMaxAggregateOutputType | null;
};
export type SniperRequestAvgAggregateOutputType = {
    chainId: number | null;
    targetGwei: number | null;
};
export type SniperRequestSumAggregateOutputType = {
    chainId: number | null;
    targetGwei: number | null;
};
export type SniperRequestMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    chainId: number | null;
    rawTx: string | null;
    targetGwei: number | null;
    status: string | null;
    txHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SniperRequestMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    chainId: number | null;
    rawTx: string | null;
    targetGwei: number | null;
    status: string | null;
    txHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SniperRequestCountAggregateOutputType = {
    id: number;
    userId: number;
    chainId: number;
    rawTx: number;
    targetGwei: number;
    status: number;
    txHash: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SniperRequestAvgAggregateInputType = {
    chainId?: true;
    targetGwei?: true;
};
export type SniperRequestSumAggregateInputType = {
    chainId?: true;
    targetGwei?: true;
};
export type SniperRequestMinAggregateInputType = {
    id?: true;
    userId?: true;
    chainId?: true;
    rawTx?: true;
    targetGwei?: true;
    status?: true;
    txHash?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SniperRequestMaxAggregateInputType = {
    id?: true;
    userId?: true;
    chainId?: true;
    rawTx?: true;
    targetGwei?: true;
    status?: true;
    txHash?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SniperRequestCountAggregateInputType = {
    id?: true;
    userId?: true;
    chainId?: true;
    rawTx?: true;
    targetGwei?: true;
    status?: true;
    txHash?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SniperRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SniperRequestWhereInput;
    orderBy?: Prisma.SniperRequestOrderByWithRelationInput | Prisma.SniperRequestOrderByWithRelationInput[];
    cursor?: Prisma.SniperRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SniperRequestCountAggregateInputType;
    _avg?: SniperRequestAvgAggregateInputType;
    _sum?: SniperRequestSumAggregateInputType;
    _min?: SniperRequestMinAggregateInputType;
    _max?: SniperRequestMaxAggregateInputType;
};
export type GetSniperRequestAggregateType<T extends SniperRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateSniperRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSniperRequest[P]> : Prisma.GetScalarType<T[P], AggregateSniperRequest[P]>;
};
export type SniperRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SniperRequestWhereInput;
    orderBy?: Prisma.SniperRequestOrderByWithAggregationInput | Prisma.SniperRequestOrderByWithAggregationInput[];
    by: Prisma.SniperRequestScalarFieldEnum[] | Prisma.SniperRequestScalarFieldEnum;
    having?: Prisma.SniperRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SniperRequestCountAggregateInputType | true;
    _avg?: SniperRequestAvgAggregateInputType;
    _sum?: SniperRequestSumAggregateInputType;
    _min?: SniperRequestMinAggregateInputType;
    _max?: SniperRequestMaxAggregateInputType;
};
export type SniperRequestGroupByOutputType = {
    id: string;
    userId: string;
    chainId: number;
    rawTx: string;
    targetGwei: number;
    status: string;
    txHash: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: SniperRequestCountAggregateOutputType | null;
    _avg: SniperRequestAvgAggregateOutputType | null;
    _sum: SniperRequestSumAggregateOutputType | null;
    _min: SniperRequestMinAggregateOutputType | null;
    _max: SniperRequestMaxAggregateOutputType | null;
};
type GetSniperRequestGroupByPayload<T extends SniperRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SniperRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SniperRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SniperRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SniperRequestGroupByOutputType[P]>;
}>>;
export type SniperRequestWhereInput = {
    AND?: Prisma.SniperRequestWhereInput | Prisma.SniperRequestWhereInput[];
    OR?: Prisma.SniperRequestWhereInput[];
    NOT?: Prisma.SniperRequestWhereInput | Prisma.SniperRequestWhereInput[];
    id?: Prisma.StringFilter<"SniperRequest"> | string;
    userId?: Prisma.StringFilter<"SniperRequest"> | string;
    chainId?: Prisma.IntFilter<"SniperRequest"> | number;
    rawTx?: Prisma.StringFilter<"SniperRequest"> | string;
    targetGwei?: Prisma.FloatFilter<"SniperRequest"> | number;
    status?: Prisma.StringFilter<"SniperRequest"> | string;
    txHash?: Prisma.StringNullableFilter<"SniperRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SniperRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SniperRequest"> | Date | string;
};
export type SniperRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    chainId?: Prisma.SortOrder;
    rawTx?: Prisma.SortOrder;
    targetGwei?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SniperRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SniperRequestWhereInput | Prisma.SniperRequestWhereInput[];
    OR?: Prisma.SniperRequestWhereInput[];
    NOT?: Prisma.SniperRequestWhereInput | Prisma.SniperRequestWhereInput[];
    userId?: Prisma.StringFilter<"SniperRequest"> | string;
    chainId?: Prisma.IntFilter<"SniperRequest"> | number;
    rawTx?: Prisma.StringFilter<"SniperRequest"> | string;
    targetGwei?: Prisma.FloatFilter<"SniperRequest"> | number;
    status?: Prisma.StringFilter<"SniperRequest"> | string;
    txHash?: Prisma.StringNullableFilter<"SniperRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SniperRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SniperRequest"> | Date | string;
}, "id">;
export type SniperRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    chainId?: Prisma.SortOrder;
    rawTx?: Prisma.SortOrder;
    targetGwei?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SniperRequestCountOrderByAggregateInput;
    _avg?: Prisma.SniperRequestAvgOrderByAggregateInput;
    _max?: Prisma.SniperRequestMaxOrderByAggregateInput;
    _min?: Prisma.SniperRequestMinOrderByAggregateInput;
    _sum?: Prisma.SniperRequestSumOrderByAggregateInput;
};
export type SniperRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.SniperRequestScalarWhereWithAggregatesInput | Prisma.SniperRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.SniperRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SniperRequestScalarWhereWithAggregatesInput | Prisma.SniperRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SniperRequest"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"SniperRequest"> | string;
    chainId?: Prisma.IntWithAggregatesFilter<"SniperRequest"> | number;
    rawTx?: Prisma.StringWithAggregatesFilter<"SniperRequest"> | string;
    targetGwei?: Prisma.FloatWithAggregatesFilter<"SniperRequest"> | number;
    status?: Prisma.StringWithAggregatesFilter<"SniperRequest"> | string;
    txHash?: Prisma.StringNullableWithAggregatesFilter<"SniperRequest"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SniperRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SniperRequest"> | Date | string;
};
export type SniperRequestCreateInput = {
    id?: string;
    userId: string;
    chainId: number;
    rawTx: string;
    targetGwei: number;
    status?: string;
    txHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SniperRequestUncheckedCreateInput = {
    id?: string;
    userId: string;
    chainId: number;
    rawTx: string;
    targetGwei: number;
    status?: string;
    txHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SniperRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    chainId?: Prisma.IntFieldUpdateOperationsInput | number;
    rawTx?: Prisma.StringFieldUpdateOperationsInput | string;
    targetGwei?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SniperRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    chainId?: Prisma.IntFieldUpdateOperationsInput | number;
    rawTx?: Prisma.StringFieldUpdateOperationsInput | string;
    targetGwei?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SniperRequestCreateManyInput = {
    id?: string;
    userId: string;
    chainId: number;
    rawTx: string;
    targetGwei: number;
    status?: string;
    txHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SniperRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    chainId?: Prisma.IntFieldUpdateOperationsInput | number;
    rawTx?: Prisma.StringFieldUpdateOperationsInput | string;
    targetGwei?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SniperRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    chainId?: Prisma.IntFieldUpdateOperationsInput | number;
    rawTx?: Prisma.StringFieldUpdateOperationsInput | string;
    targetGwei?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SniperRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    chainId?: Prisma.SortOrder;
    rawTx?: Prisma.SortOrder;
    targetGwei?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SniperRequestAvgOrderByAggregateInput = {
    chainId?: Prisma.SortOrder;
    targetGwei?: Prisma.SortOrder;
};
export type SniperRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    chainId?: Prisma.SortOrder;
    rawTx?: Prisma.SortOrder;
    targetGwei?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SniperRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    chainId?: Prisma.SortOrder;
    rawTx?: Prisma.SortOrder;
    targetGwei?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SniperRequestSumOrderByAggregateInput = {
    chainId?: Prisma.SortOrder;
    targetGwei?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type SniperRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    chainId?: boolean;
    rawTx?: boolean;
    targetGwei?: boolean;
    status?: boolean;
    txHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["sniperRequest"]>;
export type SniperRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    chainId?: boolean;
    rawTx?: boolean;
    targetGwei?: boolean;
    status?: boolean;
    txHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["sniperRequest"]>;
export type SniperRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    chainId?: boolean;
    rawTx?: boolean;
    targetGwei?: boolean;
    status?: boolean;
    txHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["sniperRequest"]>;
export type SniperRequestSelectScalar = {
    id?: boolean;
    userId?: boolean;
    chainId?: boolean;
    rawTx?: boolean;
    targetGwei?: boolean;
    status?: boolean;
    txHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SniperRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "chainId" | "rawTx" | "targetGwei" | "status" | "txHash" | "createdAt" | "updatedAt", ExtArgs["result"]["sniperRequest"]>;
export type $SniperRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SniperRequest";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        chainId: number;
        rawTx: string;
        targetGwei: number;
        status: string;
        txHash: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["sniperRequest"]>;
    composites: {};
};
export type SniperRequestGetPayload<S extends boolean | null | undefined | SniperRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload, S>;
export type SniperRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SniperRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SniperRequestCountAggregateInputType | true;
};
export interface SniperRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SniperRequest'];
        meta: {
            name: 'SniperRequest';
        };
    };
    findUnique<T extends SniperRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, SniperRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SniperRequestClient<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SniperRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SniperRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SniperRequestClient<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SniperRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, SniperRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__SniperRequestClient<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SniperRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SniperRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SniperRequestClient<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SniperRequestFindManyArgs>(args?: Prisma.SelectSubset<T, SniperRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SniperRequestCreateArgs>(args: Prisma.SelectSubset<T, SniperRequestCreateArgs<ExtArgs>>): Prisma.Prisma__SniperRequestClient<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SniperRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, SniperRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SniperRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SniperRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SniperRequestDeleteArgs>(args: Prisma.SelectSubset<T, SniperRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__SniperRequestClient<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SniperRequestUpdateArgs>(args: Prisma.SelectSubset<T, SniperRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__SniperRequestClient<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SniperRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, SniperRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SniperRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, SniperRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SniperRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SniperRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SniperRequestUpsertArgs>(args: Prisma.SelectSubset<T, SniperRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__SniperRequestClient<runtime.Types.Result.GetResult<Prisma.$SniperRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SniperRequestCountArgs>(args?: Prisma.Subset<T, SniperRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SniperRequestCountAggregateOutputType> : number>;
    aggregate<T extends SniperRequestAggregateArgs>(args: Prisma.Subset<T, SniperRequestAggregateArgs>): Prisma.PrismaPromise<GetSniperRequestAggregateType<T>>;
    groupBy<T extends SniperRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SniperRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: SniperRequestGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SniperRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSniperRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SniperRequestFieldRefs;
}
export interface Prisma__SniperRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SniperRequestFieldRefs {
    readonly id: Prisma.FieldRef<"SniperRequest", 'String'>;
    readonly userId: Prisma.FieldRef<"SniperRequest", 'String'>;
    readonly chainId: Prisma.FieldRef<"SniperRequest", 'Int'>;
    readonly rawTx: Prisma.FieldRef<"SniperRequest", 'String'>;
    readonly targetGwei: Prisma.FieldRef<"SniperRequest", 'Float'>;
    readonly status: Prisma.FieldRef<"SniperRequest", 'String'>;
    readonly txHash: Prisma.FieldRef<"SniperRequest", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SniperRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SniperRequest", 'DateTime'>;
}
export type SniperRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    where: Prisma.SniperRequestWhereUniqueInput;
};
export type SniperRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    where: Prisma.SniperRequestWhereUniqueInput;
};
export type SniperRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    where?: Prisma.SniperRequestWhereInput;
    orderBy?: Prisma.SniperRequestOrderByWithRelationInput | Prisma.SniperRequestOrderByWithRelationInput[];
    cursor?: Prisma.SniperRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SniperRequestScalarFieldEnum | Prisma.SniperRequestScalarFieldEnum[];
};
export type SniperRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    where?: Prisma.SniperRequestWhereInput;
    orderBy?: Prisma.SniperRequestOrderByWithRelationInput | Prisma.SniperRequestOrderByWithRelationInput[];
    cursor?: Prisma.SniperRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SniperRequestScalarFieldEnum | Prisma.SniperRequestScalarFieldEnum[];
};
export type SniperRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    where?: Prisma.SniperRequestWhereInput;
    orderBy?: Prisma.SniperRequestOrderByWithRelationInput | Prisma.SniperRequestOrderByWithRelationInput[];
    cursor?: Prisma.SniperRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SniperRequestScalarFieldEnum | Prisma.SniperRequestScalarFieldEnum[];
};
export type SniperRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SniperRequestCreateInput, Prisma.SniperRequestUncheckedCreateInput>;
};
export type SniperRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SniperRequestCreateManyInput | Prisma.SniperRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SniperRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    data: Prisma.SniperRequestCreateManyInput | Prisma.SniperRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SniperRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SniperRequestUpdateInput, Prisma.SniperRequestUncheckedUpdateInput>;
    where: Prisma.SniperRequestWhereUniqueInput;
};
export type SniperRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SniperRequestUpdateManyMutationInput, Prisma.SniperRequestUncheckedUpdateManyInput>;
    where?: Prisma.SniperRequestWhereInput;
    limit?: number;
};
export type SniperRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SniperRequestUpdateManyMutationInput, Prisma.SniperRequestUncheckedUpdateManyInput>;
    where?: Prisma.SniperRequestWhereInput;
    limit?: number;
};
export type SniperRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    where: Prisma.SniperRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.SniperRequestCreateInput, Prisma.SniperRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SniperRequestUpdateInput, Prisma.SniperRequestUncheckedUpdateInput>;
};
export type SniperRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
    where: Prisma.SniperRequestWhereUniqueInput;
};
export type SniperRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SniperRequestWhereInput;
    limit?: number;
};
export type SniperRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SniperRequestSelect<ExtArgs> | null;
    omit?: Prisma.SniperRequestOmit<ExtArgs> | null;
};
export {};
